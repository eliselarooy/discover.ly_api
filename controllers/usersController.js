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
    const searchedUser = req.body.username;
    console.log(searchedUser);
    const users = await User.findOne({ username: searchedUser });
    console.log(users);
    if (!req.body.username) {
      return res.status(203).send({ message: 'Username Required' });
    } else if (users !== null) {
      return res.status(203).send({ message: 'Username Already Exists' });
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(req.body.email)
    ) {
      return res.status(203).send({ message: 'Email Invalid' });
    } else if (!req.body.email) {
      return res.status(203).send({ message: 'Email Required' });
    } else if (!req.body.password) {
      return res.status(203).send({ message: 'Password Required' });
    } else if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        req.body.password
      )
    ) {
      return res.status(203).send({
        message:
          'Password is not valid. Password must contain: 10 characters, 1 symbol and 1 number.',
      });
    } else if (!req.body.passwordConfirmation) {
      return res
        .status(203)
        .send({ message: 'Password Confirmation Required' });
    } else if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(203).send({ message: 'Passwords do not match' });
    }
    const user = await User.create(req.body);
    return res.status(201).send({ message: 'success', user });
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
