import allowlist from '../redis/allowlistSignedRoutes.js'
import moment from 'moment'
import crypto from 'crypto'
import signaturesConfig from '../config/signatures.js'

/**
 * @desc Generate a random signature and add it to redis signed urls allowlist with the payload value
 * @param {string} payload - The value to save on redis
 * @param {Object} action - The action to save with payload
 * @param {string} [action.id='GENERIC'] - The id (type) of action
 * @param {number} [action.expiration.time=5] - The expiration time value
 * @param {string} [action.expiration.time='d'] - The expiration time unit
 * @return {string} signature
 * @example
 * const payload = user.id
 * const action = { id: 'EMAIL_VALIDATION', expiration: { time: 5, unit: 'd' }}
 * const signature = await signatureGenerate(payload, action)
 */
async function signatureGenerate (payload, action = signaturesConfig.generic) {
  const signature = crypto.randomBytes(24).toString('hex')
  const expirationTime = moment().add(action.expiration.time, action.expiration.unit).unix()
  await allowlist.add(signature, `{ "action": "${action.id}", "value": "${payload}" }`, expirationTime)
  return signature
}

/**
 * @desc Check if a signature is on the redis signed urls allowlist
 * @param {string} sign - Signature
 * @return {boolean}
 */
async function signatureCheckAllowlist (sign) {
  return allowlist.has(sign)
}

/**
 * @desc Get the payload from signature on the redis signed urls allowlist
 * @param {string} sign - Sign
 * @return {{action:string, value:string}} Returns the action ID and the value associated
 */
async function signaturePayload (sign) {
  const payload = await allowlist.find(sign)
  return JSON.parse(payload)
}

/**
 * @desc Remove a signature from the redis signed urls allowlist
 * @param {string} signature
 */
async function signatureDelete (signature) {
  allowlist.delete(signature)
}

/**
 * @desc Check if payload has a specific action associated with it.
 * You can get the payload using {@link signaturePayload}
 * @param {{action:string, value:string}} payload - The payload
 * @param {Object} action - The action
 * @param {string} [action.id='GENERIC'] - The id (type) of action
 * @returns
 */
function signaturePayloadValidateAction (payload, action = signaturesConfig.generic) {
  return payload.action == action.id
}

/**
 * @desc Get complete url links with signature included.
 * You can generate signatures using {@link signatureGenerate}
 * @param {string} route - The base url path (doesn't matters if it is absolute or not)
 * @param {string} signature - The signature
 * @returns {string} the link with signature included
 */
function signedUrlPath (route, signature) {
  return `${route}?sign=${signature}`
}

export { signatureCheckAllowlist, signaturePayload, signatureGenerate, signedUrlPath, signatureDelete, signaturePayloadValidateAction }
