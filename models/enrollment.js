'use strict'

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate (models) {
      Enrollment.belongsTo(models.Student, {
        foreignKey: 'student_id'
      })
      Enrollment.belongsTo(models.Class, {
        foreignKey: 'class_id'
      })
    }
  }
  Enrollment.init({
    status: DataTypes.BOOLEAN,
    student_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
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
