const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const signin = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.verification || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    data: {
      token,
      user,
    }
  })
}
module.exports = signin
