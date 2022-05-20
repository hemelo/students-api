import { UsersRepository } from '../repositories/usersRepository.js'
import { signatureCheckAllowlist } from '../services/signatureService.js'

export async function signed (req, res, next) {
  const { sign } = req.query

  if (!sign) {
    return res.status(403).send({
      message: 'No signature provided on query!'
    })
  }

  const check = await signatureCheckAllowlist(sign)

  if (!check) {
    return res.status(401).send({
      message: 'Invalid signature!'
    })
  }

  req.signature = sign
  next()
}

export async function verified (req, res, next) {
  const repository = new UsersRepository()
  const check = await repository.checkEmail(req.userId)

  if (check) {
    return res.status(403).send({
      message: 'You must validate your email before!'
    })
  }
}

export default { signed, verified }
