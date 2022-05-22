/**
 * @desc Required env keys on app initialization
 */
const envRequiredKeys = [
  'NODE_ENV',
  'APP_NAME',
  'APP_MAIL',
  'APP_KEY',
  'PORT',
  'REDIS_CONNECTION',
  'TEST_DATABASE',
  'DEVELOPMENT_DATABASE',
  'PRODUCTION_DATABASE',
  'MESSAGE_BROKERS',
  'MAIL_PORT',
  'MAIL_USER',
  'MAIL_PASSWORD',
  'MAIL_HOST',
  'SLACK_TOKEN'
]

export default envRequiredKeys
