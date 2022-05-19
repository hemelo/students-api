import bodyParser from 'body-parser'
import people from './personRoutes.js'
import classes from './classRoutes.js'
import classTypes from './classtypeRoutes.js'
import enrollments from './enrollmentRoutes.js'

export default function (app) {
  app.use(
    bodyParser.json(),
    people,
    classes,
    classTypes,
    enrollments
  )
}
