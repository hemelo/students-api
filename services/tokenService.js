
import jwt from 'jsonwebtoken'
import moment from 'moment'
import crypto from 'crypto'
import allowlist from '../redis/allowlist.js'
import blocklist from '../redis/blocklist.js'
import tokensConfig from '../config/tokens.js'

const accessExpirationTime = tokensConfig.access.expiration.time + tokensConfig.access.expiration.unit

async function accessTokenGenerator (payload) {
  return jwt.sign(payload, process.env.APP_KEY, { expiresIn: accessExpirationTime })
}

async function accessTokenCheckBlocklist (token) {
  return blocklist.has(token)
}

async function accessTokenVerifier (token) {
  return jwt.verify(token, process.env.APP_KEY)
}

async function accessTokenDelete (token) {
  blocklist.add(token)
}

async function refreshTokenGenerator (payload) {
  const token = crypto.randomBytes(24).toString('hex')
  const expirationTime = moment().add(tokensConfig.refresh.expiration.time, tokensConfig.refresh.expiration.unit).unix()
  await allowlist.add(token, payload.id, expirationTime)
  return token
}

async function refreshTokenFinder (token) {
  return allowlist.find(token)
}

async function refreshTokenDelete (token) {
  allowlist.delete(token)
}

export {
  accessTokenGenerator,
  accessTokenCheckBlocklist,
  accessTokenVerifier,
  accessTokenDelete,
  refreshTokenGenerator,
  refreshTokenFinder,
  refreshTokenDelete
}
