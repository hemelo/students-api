import chalk from 'chalk'

const envRequiredKeys = [
  'APP_KEY',
  'PORT',
  'REDIS_CONNECTION',
  'TEST_DATABASE',
  'DEVELOPMENT_DATABASE',
  'PRODUCTION_DATABASE'
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
