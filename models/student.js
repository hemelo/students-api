'use strict'

import { Model } from 'sequelize'

/**
 * @ignore
 */
export default (sequelize, DataTypes) => {
  class Student extends Model {
    static associate (models) {
      Student.hasMany(models.Enrollment, {
        foreignKey: 'student_id',
        scope: { status: true },
        as: 'studentEnrolls'
      })
    }
  }
  Student.init({
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
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Student',
    defaultScope: {
      where: { }
    },
    scopes: {
      active: { where: { active: true } },
      inactive: { where: { active: false } }
    }
  })
  return Student
}
