import NoCommenter from '../../models/noCommenter';

export const signup = async (ctx) => {
  const { id, name, email, password } = ctx.request.body;
  console.log(password);

  const noCommenter = new NoCommenter({
    id,
    name,
    email,
  });

  try {
    const exist = await NoCommenter.findByUsername(id);
    if (exist) {
      ctx.status = 409;
      return;
    }
    await noCommenter.setPassword(password);
    await noCommenter.save();
    ctx.body = noCommenter;
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
    const noCommenter = await NoCommenter.findByUsername(id);
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
