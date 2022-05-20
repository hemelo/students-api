import redis from 'redis'
import { promisify } from 'util'

const allowlist = redis.createClient({ url: process.env.REDIS_CONNECTION, prefix: 'allowlist-signed-routes:' })

const setAsync = promisify(allowlist.set).bind(allowlist)
const existsAsync = promisify(allowlist.exists).bind(allowlist)
const getAsync = promisify(allowlist.get).bind(allowlist)
const delAsync = promisify(allowlist.del).bind(allowlist)

export default {
  async add (key, value, expireAt) {
    await setAsync(key, value)
    allowlist.expireAt(key, expireAt)
  },

  async find (key) {
    return getAsync(key)
  },

  async has (key) {
    const result = await existsAsync(key)
    return result === 1
  },

  async delete (key) {
    await delAsync(key)
  }
}
