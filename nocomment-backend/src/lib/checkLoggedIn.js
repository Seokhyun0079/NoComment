const checkLoggedIn = (ctx, next) => {
  console.log('들어오긴함');
  if (!ctx.state.noCommenter) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
