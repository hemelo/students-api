import bodyParser from 'body-parser'
import students from './studentRoutes.js'
import classes from './classRoutes.js'
import classTypes from './classtypeRoutes.js'
import enrollments from './enrollmentRoutes.js'

/**
 * @desc Add routes to application
 * @param {Object} app Express application context
 * @see http://expressjs.com/en/resources/middleware/body-parser.html
 * @example
 * const app = express()
 * routes(app)
 */
export default function (app) {
  app.use(bodyParser.json())
  app.use('/api/v1', [
    students,
    classes,
    classTypes,
    enrollments
  ])
}
