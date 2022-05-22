import { Repository, database } from './repository.js'

/**
 * @desc Repository with specific logic to Roles table from database
 * @extends {Repository}
*/
export class RolesRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const rolesRepository = new Repository('Role')
   *
   * // You can do
   * const rolesRepository2 = new RolesRepository()
   */
  constructor () {
    super('Role')
  }

  /**
   * @desc Check if role has a permission associated
   * @param {*} roleId - Role id
   * @param {*} permName - Permission name
   * @return {boolean}
   */
  async checkIfRoleHasPermission (roleId, permName) {
    const perm = await database[this.model].findOne({
      where: {
        id: roleId
      },
      include: {
        model: database.Permission,
        where: {
          perm_name: permName
        }
      }
    })

    return perm != null
  }
}
