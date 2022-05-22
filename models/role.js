'use strict'

import { Model } from 'sequelize'

/**
 * @ignore
 */
export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate (models) {
      Role.hasMany(models.User, {
        foreignKey: 'role_id'
      })
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions',
        as: 'permissions',
        foreignKey: 'role_id'
      })
    }
  }
  Role.init({
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role_description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role'
  })
  return Role
}
