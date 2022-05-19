'use strict'

import { Model } from 'sequelize'

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
    modelName: 'Class'
  })
  return Class
}
