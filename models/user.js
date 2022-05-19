'use strict'

import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {

    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: { attributes: { } }
    },
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a')
          user.password = bcrypt.hashSync(user.password, salt)
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a')
          user.password = bcrypt.hashSync(user.password, salt)
        }
      }
    }
  })

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash)
  }

  return User
}
