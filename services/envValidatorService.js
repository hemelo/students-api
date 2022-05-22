import chalk from 'chalk'
import envRequiredKeys from '../config/env.js'

Array.prototype.missingKeys = array => {
  const missingKeys = []

  array.foreach(el => {
    if (!this.includes(el)) {
      missingKeys.push(el)
    }
  })

  return missingKeys
}

/**
 * @desc Check if app process has the environment values to run the application without break.
 * It breaks the application if it does not have
 */
export default function () {
  const missingKeys = Object.keys(process.env).missingKeys(envRequiredKeys)

  if (missingKeys.length > 0) {
    console.error(chalk.red(`Make sure to define all these environment keys: ${missingKeys.join(', ')}`))
    process.exit(1)
  }
}
