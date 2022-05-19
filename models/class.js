'use strict'

import { Model } from 'sequelize'
import { PeopleRepository } from '../repositories'

async function validateInstructor (id) {
  const peopleRepository = new PeopleRepository()
  const person = await peopleRepository.getOne({ id })
  return person.role !== 'instructor'
}

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate (models) {
      Class.hasMany(models.Enrollment, {
        foreignKey: 'class_id',
        scope: { status: true },
        as: 'classEnrolls'
      })
      Class.belongsTo(models.Person, {
        foreignKey: 'instructor_id'
      })
      Class.belongsTo(models.ClassType, {
        foreignKey: 'classType_id'
      })
    }
  }
  Class.init({
    start_date: DataTypes.DATEONLY
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Class',
    hooks: {
      beforeCreate: async (classs) => {
        if (validateInstructor(classs.instructor_id)) {
          throw new Error('Instructor Id is invalid')
        }
      },
      beforeUpdate: async (classs) => {
        if (validateInstructor(classs.instructor_id)) {
          throw new Error('Instructor Id is invalid')
        }
      }
    }
  })

  return Class
}
