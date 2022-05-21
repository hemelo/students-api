'use strict'

import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class ClassType extends Model {
    static associate (models) {
      ClassType.hasMany(models.Class, {
        foreignKey: 'classType_id'
      })
    }
  }
  ClassType.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'ClassType'
  })
  return ClassType
}
