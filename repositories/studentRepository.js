import { Repository, database } from './repository.js'
import { EnrollmentsRepository } from './enrollmentsRepository.js'

/**
 * @desc Repository with specific logic to Students table from database
 * @extends {Repository}
*/
export class StudentRepository extends Repository {
  /**
   * @desc Instantiate base repository with the model name, basically it is a shortcut
   * @example
   * // Instead of
   * const studentsRepository = new Repository('Student')
   *
   * // You can do
   * const studentsRepository2 = new StudentsRepository()
   */
  constructor () {
    super('Student')
    this.enrollments = new EnrollmentsRepository()
  }

  /**
   * @desc Get many active students
   * @param {Object} [where={}] - Other optional filter condition
   * @return {Array} Active students
   */
  async getOnlyActive (where = {}) {
    return database[this.model].scope('active').findAll({ where: { ...where } })
  }

  /**
   * @desc Get many inactive students
   * @param {Object} [where={}] - Other optional filter condition
   * @return {Array} Inactive students
   */
  async getOnlyInactive (where = {}) {
    return database[this.model].scope('inactive').findAll({ where: { ...where } })
  }

  /**
   * @desc Deactivate student and unenroll student from classes
   * @param {number} studentId - Student id
   */
  async deactivateAndUnenrollStudent (studentId) {
    database.sequelize.transaction(async transaction => {
      await super.updateOne({ active: false }, { id: studentId }, { transaction })
      await this.enrollments.updateMany({ status: false }, { student_id: studentId }, { transaction })
    })
  }

  /**
   * @desc Reactivate student and reenroll student from classes
   * @param {number} studentId - Student id
   */
  async reactivateAndRenrollStudent (studentId) {
    database.sequelize.transaction(async transaction => {
      await super.updateOne({ active: true }, studentId, { transaction })
      await this.enrollments.updateMany({ status: true }, { student_id: studentId }, { transaction })
    })
  }

  /**
   * Delete student and enrolls associated
   * @param {Object} [where={}] Condition to delete
   * @override
   */
  async deleteOne (where = {}) {
    this.deactivateAndUnenrollStudent(where.id)
    super.deleteOne(where)
  }

  /**
   * @desc Get all enrollments from a student
   * @param {Object} [where={}] - Other optional filter condition
   * @return {Array} Enrollments
   */
  async getStudentEnrollments (where = {}) {
    return super.getOne(where).getStudentEnrolls()
  }
}
