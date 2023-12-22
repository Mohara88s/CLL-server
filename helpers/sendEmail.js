// const sgMail = require('@sendgrid/mail')
// const { ServiceUnavailable } = require('http-errors')
// const { SENDGRID_KEY } = process.env

// sgMail.setApiKey(SENDGRID_KEY)

// const sendEmail = async(data) => {
//   const email = { ...data, from: 'mohara88s@gmail.com' }
//   try {
//     const a = await sgMail.send(email)
//   } catch (error) {
//     throw ServiceUnavailable(error.message)
//   }
// }

// module.exports = sendEmail


const nodemailer = require('nodemailer');
const { ServiceUnavailable } = require('http-errors')
const { NODEMAILER_KEY } = process.env

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'cll-app@meta.ua',
    pass: NODEMAILER_KEY,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
  const emailOptions = { ...data, from: 'cll-app@meta.ua' }

  transporter
    .sendMail(emailOptions)
    // .then(info => console.log(info))
    .catch(err => {
      throw ServiceUnavailable(err.message)
    });
}

module.exports = sendEmail