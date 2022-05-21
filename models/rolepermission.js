'use strict'

import { Model } from 'sequelize'
import { RolepermissionsRepository } from '../repositories'

export default (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  RolePermission.init({
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    perm_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
    timestamps: false,
    hooks: {
      beforeCreate: async (rolePermission) => {
        const rolePermissionRepository = new RolepermissionsRepository()
        const rolePermissionChecker = await rolePermissionRepository.getOne({
          role_id: rolePermission.role_id,
          perm_id: rolePermission.perm_id
        })

        if (rolePermissionChecker) {
          throw new Error('RolePermission already exists')
        }
      }
    }
  })
  return RolePermission
}
