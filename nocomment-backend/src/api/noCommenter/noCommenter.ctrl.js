import NoCommenter from '../../models/noCommenter';
import emailSender from '../../lib/emailSender';
import noCommenters from '.';
import { logger } from '../../common/log';
export const signup = async (ctx) => {
  const { stringId, name, email, password } = ctx.request.body;
  const authCode = Math.random().toString(16).substr(2, 6);
  const noCommenter = new NoCommenter({
    stringId,
    name,
    email,
    authCode,
    emailCheck: false,
  });

  try {
    const idExists = await NoCommenter.findByStringId(stringId);
    if (idExists) {
      ctx.status = 409;
      return;
    }
    const emailExists = await NoCommenter.findByEmail(email);
    if (emailExists) {
      ctx.status = 410;
      return;
    }
    await noCommenter.setPassword(password);
    await noCommenter.save();
    await emailSender(stringId, email, authCode);
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    });
  } catch (e) {
    logger.error(e);
    console.log('회원가입 실패');
    ctx.status = 500;
    ctx.body = '회원가입에 실패하였습니다. 잠시후에 다시 시도해주세요.';
    noCommenter.delete();
  }
};

export const signin = async (ctx) => {
  const { stringId, password } = ctx.request.body;
  if (!stringId || !password) {
    ctx.status = 401;
    return;
  }
  try {
    const noCommenter = await NoCommenter.findByStringId(stringId);
    if (!noCommenter) {
      ctx.status = 401;
      return;
    }
    const vaild = await noCommenter.checkPassword(password);
    if (!vaild) {
      ctx.status = 401;
      return;
    }
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async (ctx) => {
  const { noCommenter } = ctx.state;
  if (!noCommenter) {
    ctx.status = 401;
    return;
  }
  ctx.body = noCommenter;
};

export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};

export const authCode = async (ctx) => {
  const { stringId, authCode } = ctx.request.body;
  try {
    const noCommenter = await NoCommenter.findByStringId(stringId);
    /*
    프론트단에서 전송된 값이 디비의 값과 다를 경우 에러처리함.
    サーバーで検索した認証コードとクライアントから受け取った認証コードが
    一致しなかった場合はエラーとする。
    */
    if (noCommenter.authCode !== authCode) {
      ctx.status = 401;
      return;
    }
    await NoCommenter.updateOne({ stringId: stringId }, { emailCheck: true });
    noCommenter.emailCheck = true;
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  try {
    const { name } = ctx.request.body;
    const result = await NoCommenter.updateOne(
      { _id: ctx.state.noCommenter._id },
      { name: name },
    );
    const noCommenter = await NoCommenter.findById({
      _id: ctx.state.noCommenter._id,
    });
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const updateByAdmin = async (ctx) => {
  try {
    const { stringId, level, useable, invaliDate } = ctx.request.body;
    console.dir(invaliDate);
    await NoCommenter.updateOne(
      { stringId: stringId },
      {
        level: level,
        useable: useable,
        invaliDate: !useable ? new Date(invaliDate) : null,
      },
    );
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx, next) => {
  const { tag, stringId, search } = ctx.query;
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
  try {
    let page;
    page = page = parseInt(ctx.query.page || '1', 10);
    let noCommnterList = await NoCommenter.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    ctx.body = noCommnterList.map((item) => {
      delete item.hashPassword;
      delete item.authCode;
      delete item._id;
      return item;
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
