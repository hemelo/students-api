import chalk from 'chalk'

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
  'MAIL_HOST'
]

Array.prototype.missingKeys = array => {
  const missingKeys = []

  array.foreach(el => {
    if (!this.includes(el)) {
      missingKeys.push(el)
    }
  })

  return missingKeys
}

export default function () {
  const missingKeys = Object.keys(process.env).missingKeys(envRequiredKeys)

  if (missingKeys.length > 0) {
    console.error(chalk.red(`Make sure to define all these environment keys: ${missingKeys.join(', ')}`))
    process.exit(1)
  }
}
