const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.noCommenter) {
    ctx.status = 401;
    return;
  }
  console.log('why 404 notFound');
  return next();
};

export default checkLoggedIn;
