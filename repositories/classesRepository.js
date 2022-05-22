import { Repository } from './repository.js'
import { EnrollmentsRepository } from './enrollmentsRepository.js'
import { Sequelize } from 'sequelize'

/**
 * @desc Repository with specific logic to Classes table from database
 * @extends {Repository}
*/
export class ClassesRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const classRepository = new Repository('Class')
   *
   * // You can do
   * const classRepository2 = new ClassesRepository()
   */
  constructor () {
    super('Class')
    this.enrollments = new EnrollmentsRepository()
  }

  /**
   * @desc Get all canceled enrolls from a class
   * @param {number} classId - Class Id
   * @return {Array} Cancelled enrolls
   */
  async getOneWithCancelledEnrolls (classId) {
    return this.enrollments.getCancelledEnrolls({ class_id: classId })
  }

  /**
   * @desc Get all confirmed enrolls from a class
   * @param {number} classId - Class Id
   * @return {Array} Confirmed enrolls
   */
  async getOneWithConfirmedEnrolls (classId) {
    return this.enrollments.getConfirmedEnrolls({ class_id: classId })
  }

  /**
   * @desc Get all active classes which are fullfied based on maxStudents per class
   * @param {number} maxStudents - Max students filter condition
   * @returns {{count:number, rows:array }} The classes and the count
   */
  async getFullfied (maxStudents) {
    return super.getManyAndCount({ status: true },
      {
        attributes: ['class_id'],
        group: ['class_id'],
        having: Sequelize.literal(`count(class_id) >= ${maxStudents}`)
      })
  }

  /**
   * @desc Get all enrolls from a class
   * @param {number} classId - Class Id
   * @param {Object} [where={}] - Extra filter condition
   * @return {Array} Enrolls
   */
  async getEnrollments (classId, where = {}) {
    return super.getOne({ ...where, id: classId }).getClassEnrolls()
  }
}
