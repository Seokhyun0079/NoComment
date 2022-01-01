import Koa from 'koa';
import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';
import StringUtility from '../../common/StringUtility';
import { S3_DIRECTORY_POST_IMAGE } from '../../common/const';
import { deleteFiles } from '../../common/awsS3Buket';
import NoCommenter from '../../models/noCommenter';
import { ParamConverter } from '../../lib/ParamConvert';
const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};
export const write = async (ctx: Koa.Context) => {
  const { title, body, tags } = ctx.request.body;
  console.dir(body);
  const post = new Post({
    title,
    body,
    tags,
    noCommenter: ctx.state.noCommenter,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw('faild write post', 500);
  }
};

export const list = async (ctx: Koa.Context, next: Function) => {
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  let tag: string;
  let stringId: string;
  let search: string;
  tag = ParamConverter.ctxQueryConvert(ctx.query.tag);
  stringId = ParamConverter.ctxQueryConvert(ctx.query.stringId);
  search = ParamConverter.ctxQueryConvert(ctx.query.search);
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음 {name: /a/}
  const query = {
    ...(stringId ? { 'noCommenter.stringId': stringId } : {}),
    ...(tag ? { tags: tag } : {}),
    ...(search
      ? {
          $or: [{ title: new RegExp(search) }, { body: new RegExp(search) }],
        }
      : {}),
  };
  let page: number;
  const postCount: number = await Post.countDocuments(query).exec();
  try {
    page = parseInt(ParamConverter.ctxQueryConvert(ctx.query.page) || '1', 10);
    if (page < 1) {
      page = 1;
    } else if (page > Math.ceil(postCount / 10)) {
      page = Math.ceil(postCount / 10);
    }
  } catch (e) {
    page = 1;
  }
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    //ctx.set's second parameter is string of string[]?
    ctx.set('Last-Page', Math.ceil(postCount / 10) + '');
    ctx.body = posts.map((post: any) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw('faild get Post List', 500);
  }
};
// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body: string) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const read = async (ctx: Koa.Context) => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx: Koa.Context, next: Function) => {
  const { id } = ctx.params;
  try {
    const { body } = await Post.findByIdAndRemove(id).exec();
    let imgUrls = StringUtility.findImg(body)!;
    let imgFiles = [];
    for (let url of imgUrls) {
      let item = url[1].toString();
      let fileNameStart = item.lastIndexOf('/');
      imgFiles.push({
        Key: S3_DIRECTORY_POST_IMAGE + item.substring(fileNameStart + 1),
      });
    }
    if (imgFiles.length > 0) {
      deleteFiles(imgFiles);
    }
    return next();
  } catch (e) {
    ctx.throw('faild remove file', 500);
  }
};

export const update = async (ctx: Koa.Context, next: Function) => {
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw('faild update post', 500);
  }
};
export const getPostById = async (ctx: Koa.Context, next: Function) => {
  console.log('getPostById');
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    let post = await Post.findById(id);
    let user = await NoCommenter.findByStringId(post.noCommenter.stringId);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    post.noCommenter.profileImg = user.profileImg;
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const checkOwnPost = (ctx: Koa.Context, next: Function) => {
  console.log('checkOwnPost');
  const { noCommenter, post } = ctx.state;
  if (
    post.noCommenter._id.toString() !== noCommenter._id &&
    noCommenter.level != 'admin'
  ) {
    ctx.status = 403;
    return;
  }
  return next();
};
export const postvalidation = (ctx: Koa.Context, next: Function) => {
  const { body, title } = ctx.request.body;
  let validationFlg = true;
  let innerText = StringUtility.deleteHtmlTag(body);
  if (!StringUtility.inputValidation(title)) {
    validationFlg = false;
  }
  if (!StringUtility.inputValidation(innerText)) {
    validationFlg = false;
  }
  if (!validationFlg) {
    ctx.status = 500;
    ctx.body = '잘못된 입력입니다.';
    return;
  }
  return next();
};
