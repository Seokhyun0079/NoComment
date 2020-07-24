import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

const noCommenterSchema = new Schema({
  StringId: String,
  name: String,
  email: String,
  hashPassword: String,
});

noCommenterSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashPassword = hash;
};

noCommenterSchema.statics.findByUsername = function (id) {
  return this.findOne({ id });
};

noCommenterSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashPassword);
  return result;
};

noCommenterSchema.methodsserialize = function () {
  const data = this.toJSON();
  delete data.hashPassword;
  return data;
};

noCommenterSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
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
