import { Repository, database } from './repository.js'
import { EnrollmentsRepository } from './enrollmentsRepository.js'

export class PeopleRepository extends Repository {
  constructor () {
    super('Person')
    this.enrollments = new EnrollmentsRepository()
  }

  async getOnlyActive (where = {}) {
    return database[this.model].scope('active').findAll({ where: { ...where } })
  }

  async getOnlyInactive (where = {}) {
    return database[this.model].scope('inactive').findAll({ where: { ...where } })
  }

  async deactivateAndUnenrollStudent (studentId) {
    return database.sequelize.transaction(async transaction => {
      await super.updateOne({ active: false }, { id: studentId }, { transaction })
      await this.enrollments.updateMany({ status: false }, { student_id: studentId }, { transaction })
    })
  }

  async reactivateAndRenrollStudent (studentId) {
    return database.sequelize.transaction(async transaction => {
      await super.updateOne({ active: true }, studentId, { transaction })
      await this.enrollments.updateMany({ status: true }, { student_id: studentId }, { transaction })
    })
  }

  async deleteOne (where = {}) {
    this.deactivateAndUnenrollStudent(where.id)
    return super.deleteOne(where)
  }

  async getStudentEnrollments (where = {}) {
    return super.getOne(where).getStudentEnrolls()
  }
}
