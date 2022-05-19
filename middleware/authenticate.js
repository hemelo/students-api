import jwt from 'jsonwebtoken'
import blacklist from '../redis/blacklist.js'

export default async function (req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  const tokenIsOnBlacklist = await blacklist.has(token)

  if (tokenIsOnBlacklist) {
    throw new jwt.JsonWebTokenError('Invalid token')
  }

  jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    req.userId = decoded.id
    next()
  })
}
