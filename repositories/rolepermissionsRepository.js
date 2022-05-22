import { Repository } from './repository.js'

/**
 * @desc Repository with specific logic to RolePermissions table from database
 * @extends {Repository}
*/
export class RolepermissionsRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const rolepermissionsRepository = new Repository('RolePermission')
   *
   * // You can do
   * const rolepermissionsRepository2 = new RolepermissionsRepository()
   */
  constructor () {
    super('RolePermission')
  }
}
