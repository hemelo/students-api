/**
* @desc Middleware to get order method (ascending, descending) on query
* @param {Express.Request} req - Auto injected argument by Express
* @param {Express.Response} res - Auto injected argument by Express
* @param {Function} next - Auto injected function arg by Express
* @example
* const middlewares = [ utils.sort ]
*/
export async function sort (req, res, next) {
  const { sort } = req.query

  if (!sort) {
    next()
  }

  const sortTypes = {
    descending: 'DESC',
    ascending: 'ASC'
  }

  const sortIndex = Object.keys(sortTypes)
    .findIndex(e => e.startsWith(String(sort).toLowerCase()))

  if (sortIndex !== -1) {
    req.order = Object.values(sortTypes)[sortIndex]
  }

  next()
}

export default { sort }
