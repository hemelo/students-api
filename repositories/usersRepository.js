import { Repository, database } from './repository.js'

/**
 * @desc Repository with specific logic to Users table from database
 * @extends {Repository}
*/
export class UsersRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const usersRepository = new Repository('User')
   *
   * // You can do
   * const usersRepository2 = new UsersRepository()
   */
  constructor () {
    super('User')
  }

  /**
   * @desc Authentication method, it verifies if login fields are valid and matches with database
   * @param {Object} body
   * @param {string} body.password - Login password
   * @param {string} body.email - Login email
   * @param {string} body.username - Login username
   * @throws {InvalidBodyError} throw when body does not have required fields
   * @throws {InvalidArgumentError} throw when body field has invalid or non exist value
   * @return {?User}
   */
  async authenticate (body) {
    if (!('password' in body)) {
      throw new Error('Password is required')
    }

    if ('email' in body) {
      return this.authenticateByEmail(body.email, body.password)
    } else if ('username' in body) {
      return this.authenticateByUsername(body.username, body.password)
    } else {
      throw new Error('Username or Email is required')
    }
  }

  /**
   * @ignore
   */
  async authenticateByUsername (username, password) {
    const user = await database[this.model].scope('withPassword').findOne({ where: { username } })

    if (user != null) {
      const isAuth = user.validPassword(password, user.password)

      if (!isAuth) {
        throw new Error('Password is wrong')
      }

      return user
    } else {
      throw new Error('Username does not exist')
    }
  }

  /**
   * @ignore
   */
  async authenticateByEmail (email, password) {
    const user = await database[this.model].scope('withPassword').findOne({ where: { email } })

    if (user != null) {
      const isAuth = user.validPassword(password, user.password)

      if (!isAuth) {
        throw new Error('Password is wrong')
      }

      return user
    } else {
      throw new Error('Email does not exist')
    }
  }

  /**
   * @desc Update one record from database based on filter condition
   * @param {Object} updatedData - Updated data
   * @param {Object} [where={}] - Filter condition
   * @param {Object} [transaction={}] - The current transaction, argument used when needed to perform many actions on same transaction
   * @todo Unnecessary override, just make DataAccessProjections
   * @override
   */
  async updateOne (updatedData, where, transaction = {}) {
    if (updatedData.email_verification) {
      delete updatedData.email_verification
    }

    return database[this.model].scope('withPassword')
      .update(updatedData, { where: { ...where } }, transaction)
  }

  /**
   * @desc Verify user email (turn user verified)
   * @param {number} id - User Id
   * @param {Object} [transaction={}] - The current transaction, argument used when needed to perform many actions on same transaction
   */
  async verifyEmail (id, transaction = {}) {
    database[this.model]
      .update({ email_verification: true }, { where: { id } }, transaction)
  }

  /**
   * @desc Check if user verified their email
   * @param {number} id - User Id
   * @returns {boolean}
   */
  async checkEmail (id) {
    const user = await super.getOne({ id, email_verification: true })
    return user != null
  }

  /**
   * @desc Get user role name
   * @param {number} id - User Id
   * @returns {string} Role name
   */
  async getUserRole (id) {
    const user = await database[this.model].findOne({ where: { id }, include: database.Role })
    return user.role.role_name
  }

  /**
   * @desc Create a new record on database
   * @param {Object} data - New model data
   * @returns {Object} The new object
   * @todo Unnecessary override, just make DataAccessProjections
   * @override
   */
  async create (data) {
    return super.create((({ username, email, password }) => ({ username, email, password }))(data))
  }
}
