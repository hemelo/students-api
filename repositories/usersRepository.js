import { Repository, database } from './repository.js'

export class UsersRepository extends Repository {
  constructor () {
    super('User')
  }

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

  async updateOne (updatedData, where, transaction = {}) {
    return database[this.model].scope('withPassword')
      .update(updatedData, { where: { ...where } }, transaction)
  }
}
