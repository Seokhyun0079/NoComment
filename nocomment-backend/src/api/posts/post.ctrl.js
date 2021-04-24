import Post from '../../models/post';
import mongoose from 'mongoose';
import sanitizeHtml from 'sanitize-html';
import Joi from 'joi';
import StringUtility from '../../common/StringUtility';
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
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  console.log(ctx.state.noCommenter);
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
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, stringId } = ctx.query;
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(stringId ? { 'noCommenter.stringId': stringId } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx, next) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();

    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
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

  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때에는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const getPostById = async (ctx, next) => {
  console.log('getPostById');
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const checkOwnPost = (ctx, next) => {
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
export const postvalidation = (ctx, next) => {
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
