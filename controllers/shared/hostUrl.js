/**
 * @desc Get the absolute path for application like https://www.example.com through a
 * arandom application request to get the relevant dynamic info needed to mount the absolute path
 * @param {Object} req - The random Express Request
 * @returns {string} The absolute application url
 */
export default function (req) {
  return req.protocol + '://' + req.hostname
}
