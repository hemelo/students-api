import express from 'express'
import routes from './routes'
import cors from './middleware/cors.js'

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

cors(app)
routes(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
