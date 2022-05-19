export default function (req, res, next) {
  const token = req.headers['x-access-token']
  if (token) {
    return res.status(403).send({
      message: 'Cannot signup! You are authenticated with token'
    })
  }

  next()
}
