'use strict'

import nodemailer from 'nodemailer'

class Email {
  async sendMail () {
    const login = {
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      },
      port: process.env.MAIL_PORT
    }

    if (!['production', 'prod'].includes(process.env.NODE_ENV)) {
      const testAccount = await nodemailer.createTestAccount()
      login.host = 'smtp.ethereal.email'
      login.auth = testAccount
      login.port = 587
    }

    const transporter = nodemailer.createTransport({
      host: login.auth,
      port: login.port,
      secure: login.port == 465,
      auth: login.auth
    })
    const info = await transporter.sendMail(this)

    if (!['production', 'prod'].includes(process.env.NODE_ENV)) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    }
  }
}

class UserVerificationEmail extends Email {
  constructor (user, url) {
    super()
    this.from = `"${process.env.APP_NAME}" <${process.env.APP_MAIL}>`
    this.to = user.email
    this.subject = 'Email verification'
    this.text = `Hello! Verify your e-mail here: ${url}`
    this.html = `<h1>Hello!</h1> Verify your e-mail here: <a href="${url}">${url}</a>`
  }
}

export { UserVerificationEmail }
