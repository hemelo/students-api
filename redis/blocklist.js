import redis from 'redis'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const blacklist = redis.createClient({ url: process.env.REDIS_CONNECTION, prefix: 'blocklist-access-token:' })

const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)

export default {
  add: async token => {
    const dataExpiracao = jwt.decode(token).exp
    await setAsync(token, '')
    blacklist.expireat(token, dataExpiracao)
  },
  has: async token => {
    const resultado = await existsAsync(token)
    return resultado === 1
  }
}
