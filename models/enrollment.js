'use strict'

import { Model } from 'sequelize'

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
