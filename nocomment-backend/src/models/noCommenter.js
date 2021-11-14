import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const noCommenterSchema = new Schema({
  stringId: String,
  name: String,
  email: String,
  emailCheck: Boolean,
  authCode: String,
  hashPassword: String,
  level: { type: String, default: 'nomal' },
  useable: { type: Boolean, default: true },
  profileImg: String,
});

noCommenterSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashPassword = hash;
};

noCommenterSchema.statics.findByStringId = function (stringId) {
  return this.findOne({ stringId });
};

noCommenterSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

noCommenterSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashPassword);
  return result;
};

noCommenterSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashPassword;
  delete data.authCode;
  return data;
};

noCommenterSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      stringId: this.stringId,
      name: this.name,
      email: this.email,
      emailCheck: this.emailCheck,
      level: this.level,
      profileImg: this.profileImg,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const NoCommenter = mongoose.model('noCommenter', noCommenterSchema);
export default NoCommenter;
