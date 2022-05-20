export default function (req) {
  return req.protocol + '://' + req.hostname
}
