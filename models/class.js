'use strict'

import { Model } from 'sequelize'

/**
 * @ignore
 */
export default (sequelize, DataTypes) => {
  class Class extends Model {
    static associate (models) {
      Class.hasMany(models.Enrollment, {
        foreignKey: 'class_id',
        scope: { status: true },
        as: 'classEnrolls'
      })
      Class.belongsTo(models.User, {
        foreignKey: 'instructor_id'
      })
      Class.belongsTo(models.ClassType, {
        foreignKey: 'classType_id'
      })
    }
  }
  Class.init({
    start_date: DataTypes.DATEONLY,
    instructor_id: DataTypes.INTEGER,
    classType_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Class'
  })

  return Class
}
