import allowlist from '../redis/allowlistSignedRoutes.js'
import moment from 'moment'
import crypto from 'crypto'
import signaturesConfig from '../config/signatures.js'

async function signatureGenerate (payload, action = signaturesConfig.generic) {
  const signature = crypto.randomBytes(24).toString('hex')
  const expirationTime = moment().add(action.expiration.time, action.expiration.unit).unix()
  await allowlist.add(signature, `{ "action": "${action.id}", "value": "${payload}" }`, expirationTime)
  return signature
}

async function signatureCheckAllowlist (sign) {
  return allowlist.has(sign)
}

async function signaturePayload (sign) {
  const payload = await allowlist.find(sign)
  return JSON.parse(payload)
}

async function signatureDelete (signature) {
  allowlist.delete(signature)
}

function signaturePayloadValidateAction (payload, action = signaturesConfig.generic) {
  return payload.action == action.id
}

function signedUrlPath (route, signature) {
  return `${route}?sign=${signature}`
}

export { signatureCheckAllowlist, signaturePayload, signatureGenerate, signedUrlPath, signatureDelete, signaturePayloadValidateAction }
