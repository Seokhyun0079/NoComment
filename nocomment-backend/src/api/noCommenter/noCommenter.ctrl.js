import NoCommenter from '../../models/noCommenter';
import emailSender from '../../lib/emailSender';
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
    emailSender(stringId, email, authCode);
    ctx.body = noCommenter.serialize();
    const token = noCommenter.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
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
      maxAge: 1000 * 60 * 60 * 24 * 7,
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
  const noCommenter = new NoCommenter({
    stringId,
    authCode,
  });

  try {
    const dataForCehck = await NoCommenter.findByStringId(stringId);
    if (dataForCehck.authCode == !authCode) {
      ctx.status = 409;
      return;
    }
    console.log('불리고 있긴 한걸까요?');
    console.log(stringId);
    await NoCommenter.update({ stringId: stringId }, { emailCheck: true });
    // ctx.body = noCommenter.serialize();
    // const token = noCommenter.generateToken();
    // ctx.cookies.set('access_token', token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    //   httpOnly: true,
    // });
  } catch (e) {
    ctx.throw(500, e);
  }
};
