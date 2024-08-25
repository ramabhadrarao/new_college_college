const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user exists
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return res.status(400).send('Email already exists');

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.send({ user_id: user.user_id });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).send('Email not found');

  // Check password
  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create and assign token
  const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ token });
};

// Change Password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.user_id);

  // Check old password
  const validPass = bcrypt.compareSync(oldPassword, user.password);
  if (!validPass) return res.status(400).send('Invalid old password');

  // Hash new password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  // Update password
  user.password = hashedPassword;
  await user.save();

  res.send('Password updated successfully');
};

// Logout
exports.logout = (req, res) => {
  // Just invalidate the token on the client-side or set an expiry time
  res.send('Logged out successfully');
};
