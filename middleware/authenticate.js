
import { accessTokenCheckBlocklist, accessTokenVerifier, refreshTokenDelete, refreshTokenFinder } from '../services/tokenService'

/**
* @desc Middleware to check if user is not logged (Does not have JWT Token on headers)
* @param {Express.Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [ authentication.access ]
*/
export async function access (req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  const check = await accessTokenCheckBlocklist(token)

  if (check) {
    return res.status(401).send({
      message: 'Invalid token!'
    })
  }

  const { id } = await accessTokenVerifier(token)

  if (!id) {
    return res.status(401).send({
      message: 'Unauthorized!'
    })
  }

  req.userId = id
  next()
}

/**
* @desc Middleware to check if user is logged
* @param {Express.Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [ authentication.logged ]
*/
export async function logged (req, res, next) {
  const token = req.headers['x-access-token']
  if (token) {
    return res.status(403).send({
      message: 'You are already authenticated with token'
    })
  }

  next()
}

/**
* @desc Middleware to refresh the JWT token
* @param {Express.Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @return {Object} Only return if doesn't pass the check, otherwise it will pass to the next middleware through next()
* @example
* const middlewares = [ authentication.refresh ]
*/
export async function refresh (req, res, next) {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).send({
      message: 'No refresh token provided!'
    })
  }

  const id = await refreshTokenFinder(refreshToken)

  if (!id) {
    return res.status(401).send({
      message: 'Invalid refresh token'
    })
  }

  req.userId = id

  await refreshTokenDelete(refreshToken)
  next()
}

export default { access, logged, refresh }
