const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email: notUpdatedEmail, password } = req.body;
  const email = notUpdatedEmail.toLowerCase()
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Incorrect login data");
  }


  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 90 * 24 * 60 * 60 });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    user: {
      name: user.name,
      email,
      subscription: user.subscription,
    },
    token,
  });
};
module.exports = signin;
