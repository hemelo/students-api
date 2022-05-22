import { UsersRepository, RolesRepository } from '../repositories'
import { signatureCheckAllowlist } from '../services/signatureService.js'

/**
* @desc Middleware to check if route has ?sign= on query and validate the signature
* @param {Express.Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [ authorization.signed ]
*/
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

/**
* @desc Middleware to check if user verified their email
* @param {Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [ authorization.verified ]
*/
export async function verified (req, res, next) {
  const repository = new UsersRepository()
  const check = await repository.checkEmail(req.userId)

  if (check) {
    return res.status(403).send({
      message: 'You must validate your email before!'
    })
  }
}

/**
* @desc Middleware to check if user has some roles
* @param {string[]} roles - Roles to check
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [authorization.hasRole(['admin', 'moderator'])]
*/
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

/**
* @desc Middleware to check if user has permissions
* @param {string[]} permissions - Permissions to check
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [authorization.hasPermission(['show', 'delete'])]
*/
export const hasPermission = (permissions = []) => async (req, res, next) => {
  const repository = new RolesRepository()

  const hasOrNot = permissions.some(async perm => await repository.checkIfRoleHasPermission(req.userId, perm))

  if (!hasOrNot) {
    return res.status(403).send({
      message: 'You don\'t have permissions to do this action!'
    })
  }

  next()
}

export default { signed, verified, hasRole, hasPermission }
