import cors from 'cors'

const corsOptions = { }

export default function (app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    app.use(cors(corsOptions))
    next()
  })
}
