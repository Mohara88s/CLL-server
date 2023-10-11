const { User } = require("../../models");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

// const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { name, email:notUpdatedEmail, password } = req.body;
  const email = notUpdatedEmail.toLowerCase()
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("This email is already in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({
    name,
    email,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();

  // const mail = {
  //   to: email,
  //   subject: 'Email verification',
  //   html: `<a target="_blank"
  // href="http://localhost:3000/api/users/verification/${verificationToken}">CLICK THIS FOR VERIFICATION</a>`
  // }
  // sendEmail(mail)

  const createdUser = await User.findOne({ email });
  const payload = {
    id: createdUser._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(createdUser._id, { token });

  res.status(201).json({
    user: {
      name,
      email,
      subscription: createdUser.subscription,
    },
    token,
  });
};
module.exports = signup;
