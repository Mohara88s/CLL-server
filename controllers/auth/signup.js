const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const newUser = new User({
    email,
    avatarURL,
    verificationToken
  })
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank"
  href="http://localhost:3000/api/users/verification/${verificationToken}">CLICK THIS FOR VERIFICATION</a>`
  }
  sendEmail(mail)
  res.status(201).json({
    data: {
      newUser,
    }
  })
}
module.exports = signup
