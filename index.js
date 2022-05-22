import express from 'express'
import routes from './routes'
import cors from './middleware/cors.js'
import envValidator from './services/envValidator.js'
import 'dotenv/config'

/* Env Validator */
envValidator()

/**
 * @ignore
 */
const app = express()

/* Routes */
routes(app)

/* Global Middlewares */
app.use(express.urlencoded({ extended: true }))
cors(app)

/* Initialize server */
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`)
})
