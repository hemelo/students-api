import redis from 'redis'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const blocklist = redis.createClient({ url: process.env.REDIS_CONNECTION, prefix: 'blocklist-access-token:' })

const existsAsync = promisify(blocklist.exists).bind(blocklist)
const setAsync = promisify(blocklist.set).bind(blocklist)

export default {
  add: async token => {
    const expireAt = jwt.decode(token).exp
    await setAsync(token, '')
    blocklist.expireAt(token, expireAt)
  },
  has: async token => {
    const result = await existsAsync(token)
    return result === 1
  }
}
