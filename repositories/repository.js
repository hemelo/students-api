import database from '../models'

/**
 * @desc Repository which contains database access and common operations
 * @abstract
 */
export class Repository {
  /**
   * @desc Initialize a new repository
   * @param {string} model - The model name that will be accessed in database operations
   * @example
   * const repository = new Repository('User')
   * const user = await repository.getOne({ id: 1 })
   */
  constructor (model) {
    /**
     * @desc Model name
     */
    this.model = model
  }

  /**
   * @desc Get many records from database based on filter condition
   * @param {Object} [where={}] - Filter condition
   * @param {Object} [order={}] - Order by
   * @returns {Array}
   * @example
   * const models = await repository.getMany({ role_id: 5 }, { createdAt: 'DESC' })
   */
  async getMany (where = {}, order = []) {
    return database[this.model].findAll({ where: { ...where }, order })
  }

  /**
   * @desc Get one record from database based on filter condition
   * @param {Object} [where={}] - Filter condition
   * @returns {Object}
   * @example
   * const model = await repository.getOne({ role_id: 5 })
   */
  async getOne (where = {}) {
    return database[this.model].findOne({ where: { ...where } })
  }

  /**
   * @desc Create a new record on database
   * @param {Object} data - New model data
   * @returns {Object} The new object
   * @example
   * const createdModel = await repository.create({ email: 'example@gmail.com', password: '123456678' })
   */
  async create (data) {
    return database[this.model].create(data)
  }

  /**
   * @desc Update one record from database based on filter condition
   * @param {Object} updatedData - Updated data
   * @param {Object} [where={}] - Filter condition
   * @param {Object} [transaction={}] - The current transaction, argument used when needed to perform many actions on same transaction
   * @example
   * await repository.updateOne(data, { id: 5})
   */
  async updateOne (updatedData, where, transaction = {}) {
    database[this.model]
      .update(updatedData, { where: { ...where } }, transaction)
  }

  /**
   * @desc Delete a record from database based on filter condition
   * @param {Object} [where={}] - Filter condition
   * @example
   * await repository.deleteOne({ id: 5 })
   */
  async deleteOne (where = {}) {
    database[this.model].destroy({ where: { ...where } })
  }

  /**
   * @desc Recover a record from database based on filter condition
   * @param {Object} [where={}] - Filter condition
   * @return {Object} The recovered record
   * @example
   * const recovered = await repository.recoverOne({ id: 5 })
   */
  async recoverOne (where = {}) {
    return database[this.model].restore({ where: { ...where } })
  }

  /**
   * @desc Get deleted record from database based on filter condition
   * @param {Object} [where={}] - Filter condition
   * @return {Object} The deleted record
   * @example
   * const deleted = await repository.getDeleted({ id: 5 })
   */
  async getDeleted (where = {}) {
    return database[this.model]
      .findOne({ paranoid: false, where: { ...where } })
  }

  /**
   * @desc Get many records from database and count
   * @param {Object} [where={}] - Filter condition
   * @param {Object} [aggregators] - Agreggators (group_by)
   * @returns {{count:number, rows:array }} The group objects and the count
   * @example
   * const { rows, models } = await repository.getManyAndCount({ status: true }, { attributes: ['class_id'], group: ['class_id'], having: Sequelize.literal(`count(class_id) >= ${maxStudents}`)})
   */
  async getManyAndCount (where = {}, aggregators) {
    return database[this.model]
      .findAndCountAll({ where: { ...where }, ...aggregators })
  }
}

export { database }
