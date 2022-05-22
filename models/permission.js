'use strict'

import { Model } from 'sequelize'

/**
 * @ignore
 */
export default (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate (models) {
      Permission.belongsToMany(models.Role, {
        through: 'RolePermissions',
        as: 'roles',
        foreignKey: 'perm_id'
      })
    }
  }
  Permission.init({
    perm_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    perm_description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Permission'
  })
  return Permission
}
