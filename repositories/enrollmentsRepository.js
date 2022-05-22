import { Repository, database } from './repository.js'

/**
 * @desc Repository with specific logic to Enrollments table from database
 * @extends {Repository}
*/
export class EnrollmentsRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const enrollmentsRepository = new Repository('Enrollment')
   *
   * // You can do
   * const enrollmentsRepository2 = new EnrollmentsRepository()
   */
  constructor () {
    super('Enrollment')
  }

  /**
   * @desc Get all cancelled enrolls
   * @param {Object} [where={}] - Extra filter condition
   * @return {Array} Cancelled enrolls
   */
  async getCancelledEnrolls (where = {}) {
    return database[this.model].scope('cancelled').findAll({ where: { ...where } })
  }

  /**
   * @desc Get all confirmed enrolls
   * @param {Object} [where={}] - Extra filter condition
   * @return {Array} Confirmed enrolls
   */
  async getConfirmedEnrolls (where = {}) {
    return database[this.model].scope('confirmed').findAll({ where: { ...where } })
  }

  /**
   * @desc Get all student enrollments
   * @param {number} studentId - Student id
   * @param {Object} [where={}] - Extra filter condition
   * @return {Array} Student enrollments
   */
  async getStudentEnrolls (studentId, where = {}) {
    return super.getMany({ ...where, student_id: studentId })
  }
}
