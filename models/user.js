import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseHidden from 'mongoose-hidden';
import uniqueValidator from 'mongoose-unique-validator';

import { emailRegex } from '../lib/stringTesters.js';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profileImage: { type: String },
  location: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => emailRegex.test(email),
  },
  password: {
    type: String,
    required: true,
    validate: (password) =>
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      ),
  },
});

userSchema.pre('save', function encryptPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
);

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
