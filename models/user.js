'use strict'

import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Class, {
        foreignKey: 'instructor_id'
      })

      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      })
    }
  }
  User.init({
    role_id: DataTypes.INTEGER,
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
    },
    email_verification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
        user.email_verification = false
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
