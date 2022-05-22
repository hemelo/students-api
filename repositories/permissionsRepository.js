import { Repository } from './repository.js'

/**
 * @desc Repository with specific logic to Permissions table from database
 * @extends {Repository}
*/
export class PermissionsRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const permissionsRepository = new Repository('Permission')
   *
   * // You can do
   * const permissionsRepository2 = new RolesRepository()
   */
  constructor () {
    super('Permission')
  }
}
