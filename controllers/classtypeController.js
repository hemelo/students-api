import { ClasstypesRepository } from '../repositories'

/**
 * @ignore
 */
const repository = new ClasstypesRepository()

/**
 * @desc Contains all logic methods to manage Classtype models through API requests
 */
export default class ClasstypeController {
  /**
   * @desc Show all class types
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async index (req, res) {
    try {
      const all = await repository.getMany()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show specific classtype
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async show (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOne({ id: Number(id) })
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Crate a classtype
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async create (req, res) {
    const newTypeData = req.body
    try {
      const newType = await repository.create(newTypeData)
      return res.status(200).json(newType)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Update a classtype
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async update (req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await repository.updateOne(newInfo, { id: Number(id) })
      return res.status(200).json({ message: `Id ${id} updated` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Destroy a classtype
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async destroy (req, res) {
    const { id } = req.params
    try {
      await repository.deleteOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} deleted` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Recover a classtype
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async recover (req, res) {
    const { id } = req.params
    try {
      await repository.recoverOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} recovered` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
