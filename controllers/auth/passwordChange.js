const { User } = require("../../models");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");

const passwordChange = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);
  if (!user) {
    throw new Conflict("The user with this token does not exist.");
  }
  if (user.passwordResetToken !== token) {
    throw new Conflict("The token does not belong to the user or has already been used.");
  }
  
  hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  await User.findByIdAndUpdate(user._id, { 'password': hashedPassword, 'passwordResetToken': null }, { new: true })
  const response = `Password changed successfully. Try logging in!`
  res.status(201).json({
    response
  });
};
module.exports = passwordChange;
