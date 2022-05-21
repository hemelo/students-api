import bodyParser from 'body-parser'
import students from './studentRoutes.js'
import classes from './classRoutes.js'
import classTypes from './classtypeRoutes.js'
import enrollments from './enrollmentRoutes.js'

export default function (app) {
  app.use(
    bodyParser.json(),
    students,
    classes,
    classTypes,
    enrollments
  )
}
