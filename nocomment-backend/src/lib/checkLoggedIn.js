const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.noCommenter) {
    ctx.status = 401;
    return;
  }
  return next();
};

export const authorityCheck = (ctx, next) => {
  console.dir(ctx.state.noCommenter);
  if (!ctx.state.noCommenter.level === 'admin') {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
