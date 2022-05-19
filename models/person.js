'use strict'

import { Model } from 'sequelize'
import rules from '../domain'

const roles = rules.roles || []

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate (models) {
      Person.hasMany(models.Class, {
        foreignKey: 'instructor_id'
      })

      Person.hasMany(models.Enrollment, {
        foreignKey: 'student_id',
        scope: { status: true },
        as: 'studentEnrolls'
      })
    }
  }
  Person.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        validator: function (data) {
          if (data.length < 3) {
            throw new Error('Name should have more than 3 characters')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    active: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.STRING,
      validate: {
        validator: function (data) {
          if (!roles.includes(data)) {
            throw new Error('Role should be instructor or student')
          }
        }
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Person',
    defaultScope: {
      where: { }
    },
    scopes: {
      active: { where: { active: true } },
      inactive: { where: { active: false } }
    }
  })
  return Person
}
