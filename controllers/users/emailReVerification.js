const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const { sendEmail } = require('../../helpers')

const emailReVerification = async(req, res) => {
  const { email } = req.body
  if (email === 'undefined') { throw BadRequest('Missing required field email') }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound(`User with email ${email} not registered`)
  }
  if (user.verification === true) {
    throw BadRequest('Verification has already been passed')
  }
  const { verificationToken } = user
  const mail = {
    to: email,
    subject: 'Email verification',
    html: `<a target="_blank"
    href="http://localhost:3000/api/users/verification/${verificationToken}">CLICK THIS FOR VERIFICATION</a>`
  }
  sendEmail(mail)
  res.json({
    status: 'success',
    code: 200,
    data: 'Email verification sent again'
  })
}

module.exports = emailReVerification
