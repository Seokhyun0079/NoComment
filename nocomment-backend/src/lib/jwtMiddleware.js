import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.noCommenter = {
      _id: decoded._id,
      stringId: decoded.stringId,
      name: decoded.name,
      email: decoded.email,
      emailCheck: decoded.emailCheck,
      level: decoded.level,
      profileImg: decoded.profileImg,
    };
    return next();
  } catch (e) {
    return;
  }
};

export default jwtMiddleware;
