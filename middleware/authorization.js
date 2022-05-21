import { UsersRepository, RolesRepository } from '../repositories'
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

export const hasRole = (roles = []) => async (req, res, next) => {
  const repository = new UsersRepository()
  const userRole = await repository.getUserRole(req.userId)

  if (!roles.includes(userRole.role_name)) {
    return res.status(403).send({
      message: 'You don\'t have role to do this action!'
    })
  }

  req.userRole = userRole
  next()
}

export const hasPermission = (permissions = []) => async (req, res, next) => {
  let userRole

  if (!req.userRole) {
    const userRepository = new UsersRepository()
    userRole = await userRepository.getUserRole(req.userId)
  } else {
    userRole = req.userRole
  }

  const repository = new RolesRepository()

  const hasOrNot = permissions.some(async perm => await repository.checkIfRoleHasPermission(userRole.id, perm))

  if (!hasOrNot) {
    return res.status(403).send({
      message: 'You don\'t have permissions to do this action!'
    })
  }

  req.userRole = userRole
  next()
}

export default { signed, verified, hasRole, hasPermission }
