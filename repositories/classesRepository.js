import { Repository } from './repository.js'
import { EnrollmentsRepository } from './enrollmentsRepository.js'
import { Sequelize } from 'sequelize'

export class ClassesRepository extends Repository {
  constructor () {
    super('Class')
    this.enrollments = new EnrollmentsRepository()
  }

  async getOneWithCancelledEnrolls (where = {}) {
    return this.enrollments.getCancelledEnrolls({ class_id: where.id })
  }

  async getOneWithConfirmedEnrolls (where = {}) {
    return this.enrollments.getConfirmedEnrolls({ class_id: where.id })
  }

  async getFullfied (maxStudents) {
    return super.getManyAndCount({ status: true },
      {
        attributes: ['class_id'],
        group: ['class_id'],
        having: Sequelize.literal(`count(class_id) >= ${maxStudents}`)
      })
  }

  async getEnrollments (classId, where = {}) {
    return super.getMany({ ...where, id: classId }).getClassEnrolls()
  }
}
