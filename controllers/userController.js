import { UsersRepository } from '../repositories'
import { accessTokenDelete, accessTokenGenerator, refreshTokenGenerator } from '../services/tokenService.js'
import { UserVerificationEmail } from '../services/emailService.js'
import rules from '../domain/rules.js'
import hostUrl from '../domain/hostUrl'
import { signatureDelete, signatureGenerate, signaturePayload, signaturePayloadValidateAction, signedUrlPath } from '../services/signatureService.js'
import signaturesConfig from '../config/signatures.js'

const repository = new UsersRepository()

const VALIDATE_EMAIL_ROUTE = rules.user.email_verification.route

export default class UserController {
  static async show (req, res) {
    const { id } = req.params
    try {
      const user = await repository.getOne({ id: Number(id) })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async login (req, res) {
    const userData = req.body
    try {
      const user = await repository.authenticate(userData)
      const accessToken = await accessTokenGenerator({ id: user.id })
      const refreshToken = await refreshTokenGenerator({ id: user.id })
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async verify (req, res) {
    const { id } = req.params

    try {
      const payload = await signaturePayload(req.signature)
      const checker = signaturePayloadValidateAction(payload, signaturesConfig.email_verification)

      if (!checker || payload.value != id) {
        return res.status(401).send({
          message: 'Invalid signature!'
        })
      }

      repository.verifyEmail(id)
      signatureDelete(req.signature)
      return res.status(200).json({ message: 'User verified with success!' })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async refreshVerifyLink (req, res) {
    try {
      const user = await repository.getOne({ id: req.userId })
      const signature = await signatureGenerate(req.userId, signaturesConfig.email_verification)
      const verificationUrl = signedUrlPath(`${hostUrl(req)}/${VALIDATE_EMAIL_ROUTE}/${req.userId}`, signature)
      new UserVerificationEmail(user, verificationUrl).sendMail().catch(console.error)
      return res.status(200).json({ message: `A email with the new link has send to ${user.email}` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async refresh (req, res) {
    try {
      const accessToken = await accessTokenGenerator({ id: req.userId })
      const refreshToken = await refreshTokenGenerator({ id: req.userId })
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async logout (req, res) {
    try {
      await accessTokenDelete(req.headers['x-access-token'])
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async create (req, res) {
    const newUserData = req.body
    try {
      const newUser = await repository.create(newUserData)

      if (rules.user.email_verification.status) {
        const signature = await signatureGenerate(newUser.id, signaturesConfig.email_verification)
        const verificationUrl = signedUrlPath(`${hostUrl(req)}/${VALIDATE_EMAIL_ROUTE}/${newUser.id}`, signature)
        new UserVerificationEmail(newUser, verificationUrl).sendMail().catch(console.error)
      }

      return res.status(200).json({ newUser, message: `A email with the email validation has send to ${newUser.email}. You can login without validate, but cannot do all actions` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await repository.updateOne(newInfo, { id: Number(id) })
      const updatedStudent = await repository.getOne({ id: Number(id) })
      return res.status(200).json(updatedStudent)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async destroy (req, res) {
    const { id } = req.params
    try {
      await repository.deleteOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} deleted` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async recover (req, res) {
    const { id } = req.params
    try {
      await repository.recoverOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} recovered` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
