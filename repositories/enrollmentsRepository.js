import { Repository, database } from './repository.js'

export class EnrollmentsRepository extends Repository {
  constructor () {
    super('Enrollment')
  }

  async getCancelledEnrolls (where = {}) {
    return database[this.model].scope('confirmed').findAll({ where: { ...where } })
  }

  async getConfirmedEnrolls (where = {}) {
    return database[this.model].scope('cancelled').findAll({ where: { ...where } })
  }

  async getStudentEnrolls (studentId, where = {}) {
    return super.getMany({ ...where, student_id: studentId })
  }
}
