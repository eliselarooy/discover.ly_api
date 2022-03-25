import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { secret } from '../config/environment.js';

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.userId);

  !user ? res.status(404) : res.status(200).json(user);
}

async function registerUser(req, res, next) {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).json({ message: 'Passwords do not match' });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const user =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ username: req.body.email }));

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized: User not found' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: 'Unauthorized: Password incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '6h' });

    console.log(token);

    return res.status(202).send({ token, message: 'Login successful' });
  } catch (err) {
    next(err);
  }
}

export default {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
};
