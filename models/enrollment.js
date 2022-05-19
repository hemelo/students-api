'use strict'

import { Model } from 'sequelize'
import { PeopleRepository } from '../repositories'

async function validateStudent (id) {
  const peopleRepository = new PeopleRepository()
  const person = await peopleRepository.getOne({ id })
  return person.role !== 'student'
}

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate (models) {
      Enrollment.belongsTo(models.Person, {
        foreignKey: 'student_id'
      })
      Enrollment.belongsTo(models.Class, {
        foreignKey: 'class_id'
      })
    }
  }
  Enrollment.init({
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Enrollment',
    hooks: {
      beforeCreate: async (enroll) => {
        if (validateStudent(enroll.student_id)) {
          throw new Error('Student Id is invalid')
        }
      },
      beforeUpdate: async (enroll) => {
        if (validateStudent(enroll.student_id)) {
          throw new Error('Student Id is invalid')
        }
      }
    },
    defaultScope: {
      where: { }
    },
    scopes: {
      confirmed: { where: { status: true } },
      cancelled: { where: { status: false } }
    }
  })
  return Enrollment
}
