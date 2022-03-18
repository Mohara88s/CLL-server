const sgMail = require('@sendgrid/mail')
const { ServiceUnavailable } = require('http-errors')
const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async(data) => {
  const email = { ...data, from: 'mohara88s@gmail.com' }
  try {
    await sgMail.send(email)
  } catch (error) {
    throw ServiceUnavailable(error.message)
  }
}

module.exports = sendEmail
