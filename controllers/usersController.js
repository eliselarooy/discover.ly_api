import User from '../models/user';

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
    const user = await User.findOne(
      { email: req.body.email } || { username: req.body.email }
    );

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized: User not found' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: 'Unauthorized: Password incorrect' });
    }

    // const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '6h' });

    return res.status(202).send({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
}

export default {
  registerUser,
  loginUser,
};
