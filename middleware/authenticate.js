import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    req.userId = decoded.id
    next()
  })
}
