'use strict'

import nodemailer from 'nodemailer'

/**
 * @desc Class which represents an email.
 * Subclasses must contain the data & body to send to the user email through this abstract class
 * @abstract
 */
class Email {
  /**
   * @desc Send email using subclass attributes
   */
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

/**
 * @desc Class which represents an user verification email.
 * @extends {Email}
 */
class UserVerificationEmail extends Email {
  /**
   * @param {User} user - User model
   * @param {string} url - Generated link which user should access to validate their email
   */
  constructor (user, url) {
    super()

    /**
     * @desc Sender
     * @type {string}
     */
    this.from = `"${process.env.APP_NAME}" <${process.env.APP_MAIL}>`

    /**
     * @desc Receiver
     * @type {string}
     */
    this.to = user.email

    /**
     * @desc Mail subject
     * @type {string}
     */
    this.subject = 'Email verification'

    /**
     * @desc Content
     * @type {string}
     */
    this.text = `Hello! Verify your e-mail here: ${url}`

    /**
     * @desc HTML Content
     * @type {string}
    */
    this.html = `<h1>Hello!</h1> Verify your e-mail here: <a href="${url}">${url}</a>`
  }
}

export { UserVerificationEmail }
