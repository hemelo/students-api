import database from '../models'

export class Repository {
  constructor (model) {
    this.model = model
  }

  async getMany (where = {}, order = []) {
    return database[this.model].findAll({ where: { ...where }, order })
  }

  async getOne (where = {}) {
    return database[this.model].findOne({ where: { ...where } })
  }

  async create (data) {
    return database[this.model].create(data)
  }

  async updateOne (updatedData, where, transaction = {}) {
    return database[this.model]
      .update(updatedData, { where: { ...where } }, transaction)
  }

  async updateMany (updatedData, where, transaction = {}) {
    return database[this.model]
      .update(updatedData, { where: { ...where } }, transaction)
  }

  async deleteOne (where = {}) {
    return database[this.model].destroy({ where: { ...where } })
  }

  async recoverOne (where = {}) {
    return database[this.model].restore({ where: { ...where } })
  }

  async getDeleted (where = {}) {
    return database[this.model]
      .findOne({ paranoid: false, where: { ...where } })
  }

  async getManyAndCount (where = {}, aggregators) {
    return database[this.model]
      .findAndCountAll({ where: { ...where }, ...aggregators })
  }
}

export { database }
