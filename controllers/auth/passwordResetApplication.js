const { User } = require("../../models");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const passwordResetApplication = async (req, res) => {
  const { email: notUpdatedEmail } = req.body;
  const { url: appUrl } = req.body;

  const email = notUpdatedEmail.toLowerCase()
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Email not registered");
  }
  const payload = {
    id: user._id ,
  };
  const passwordResetToken = jwt.sign(payload, SECRET_KEY, { expiresIn: 24 * 60 * 60 });
  await User.findByIdAndUpdate(user._id, { passwordResetToken });
  const mail = {
    to: email,
    subject: 'Password reset link',
    text: 'Link to password reset',
    html: `<a target="_blank"
  href="${appUrl}/?&${passwordResetToken}">Click to go to change your password</a>`
  }
  sendEmail(mail)

  const response = `Check your mailbox ${email}`
  res.status(201).json({
    response
  });
};
module.exports = passwordResetApplication;
