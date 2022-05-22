
import jwt from 'jsonwebtoken'
import moment from 'moment'
import crypto from 'crypto'
import allowlist from '../redis/allowlistRefreshToken.js'
import blocklist from '../redis/blocklistAcessToken.js'
import tokensConfig from '../config/tokens.js'

/**
 * @ignore
 */
const accessExpirationTime = tokensConfig.access.expiration.time + tokensConfig.access.expiration.unit

/**
 * @desc Generate a jwt token
 * @param {string} payload - Payload to include on token
 * @return {string} The jwt token
 */
async function accessTokenGenerator (payload) {
  return jwt.sign(payload, process.env.APP_KEY, { expiresIn: accessExpirationTime })
}

/**
 * @desc Check if jwt token is on redis access token blocklist
 * @param {string} token - Token
 * @return {boolean}
 */
async function accessTokenCheckBlocklist (token) {
  return blocklist.has(token)
}

/**
 * @desc Check if jwt token is valid
 * @param {string} token - Token
 * @return {boolean}
 */
async function accessTokenVerifier (token) {
  return jwt.verify(token, process.env.APP_KEY)
}

/**
 * @desc Invalid token and add it to redis access token blocklist
 * @param {string} token - Token
 */
async function accessTokenDelete (token) {
  blocklist.add(token)
}

/**
 * @desc Generate a refresh token and add it to redis refresh token allowlist
 * @param {string} payload - Payload to include on token
 * @return {string} The refresh token
 */
async function refreshTokenGenerator (payload) {
  const token = crypto.randomBytes(24).toString('hex')
  const expirationTime = moment().add(tokensConfig.refresh.expiration.time, tokensConfig.refresh.expiration.unit).unix()
  await allowlist.add(token, payload, expirationTime)
  return token
}

/**
 * @desc Get refresh token value from redis refresh token allowlist
 * @param {string} token - Token to find
 * @return {string} The payload
 */
async function refreshTokenFinder (token) {
  return allowlist.find(token)
}

/**
 * @desc Remove token from redis refresh token allowlist
 * @param {string} token - Token to delete
 */
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
