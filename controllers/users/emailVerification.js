
const { User } = require('../../models')
const { NotFound } = require('http-errors')

const emailVerification = async(req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken: verificationToken })
  if (!user) { throw NotFound() }
  await User.findByIdAndUpdate(user._id, { verification: true, verificationToken: null })
  res.json({
    status: 'success',
    code: 200,
    data: 'Email verification successful'
  })
}

module.exports = emailVerification
