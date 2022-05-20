'use strict'

import nodemailer from 'nodemailer'

class Email {
  async sendMail () {
    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // True for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
    const info = await transporter.sendMail(this)

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
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
