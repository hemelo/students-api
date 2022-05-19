import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const rules = require('../domain/rules.json')

export default rules
