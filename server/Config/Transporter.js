const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: process.env.Nodemailer_email,
    pass: process.env.Nodemailer_password
  }
})

module.exports = transporter