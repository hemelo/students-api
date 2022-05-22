import cors from 'cors'
import corsConfig from '../config/corsjs'

/**
 * @desc Add cors middleware to entire application
 * @param {Object} app Express application context
 * @see https://www.npmjs.com/package/cors
 * @see https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
 * @example
 * const app = express()
 * cors(app)
 */
export default function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    app.use(cors(corsConfig))
    next()
  })
}
