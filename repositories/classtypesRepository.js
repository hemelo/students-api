import { Repository } from './repository.js'

/**
 * @desc Repository with specific logic to Classtypes table from database
 * @extends {Repository}
*/
export class ClasstypesRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const classtypesRepository = new Repository('ClassType')
   *
   * // You can do
   * const classtypesRepository2 = new ClasstypesRepository()
   */
  constructor () {
    super('ClassType')
  }
}
