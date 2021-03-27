const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.noCommenter) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
