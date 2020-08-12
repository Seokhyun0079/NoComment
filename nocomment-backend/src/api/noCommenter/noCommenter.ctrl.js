import NoCommenter from '../../models/noCommenter';

export const signup = async (ctx) => {
  const { stringId, name, email, password } = ctx.request.body;
  const noCommenter = new NoCommenter({
    stringId,
    name,
    email,
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
  const { id, password } = ctx.request.body;
  if (!id || !password) {
    ctx.status = 401;
    return;
  }
  try {
    const noCommenter = await NoCommenter.findByStringId(id);
    if (!noCommenter) {
      ctx.status = 401;
      return;
    }
    const vaild = await NoCommenter.checkPassword(password);
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
