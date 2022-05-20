
import { accessTokenCheckBlocklist, accessTokenVerifier, refreshTokenDelete, refreshTokenFinder } from '../services/tokenService'

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

export async function logged (req, res, next) {
  const token = req.headers['x-access-token']
  if (token) {
    return res.status(403).send({
      message: 'Cannot signup! You are authenticated with token'
    })
  }

  next()
}

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
