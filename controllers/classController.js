import { ClassesRepository } from '../repositories'
import rules from '../domain/rules.js'

/**
 * @ignore
 */
const repository = new ClassesRepository()

/**
 * @desc Contains all logic methods to manage Class models through API requests
 */
export default class ClassController {
  /**
   * @desc Show all classes
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async index (req, res) {
    try {
      let all

      /**
       * Use utils.sort middleware
       */
      if (req.order) {
        all = await repository.getMany({}, [['start_date', req.order]])
      } else {
        all = await repository.getMany()
      }

      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show specific class
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
   * @desc Show cancelled enrolls for a class
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async showCancelled (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOneWithCancelledEnrolls(Number(id))
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show confirmed enrolls for a class
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async showConfirmed (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOneWithConfirmedEnrolls(Number(id))
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Crate a class
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
   * @desc Update a class
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async update (req, res) {
    const { id } = req.params
    const newInfo = req.body

    try {
      if (req.userRole) {
        if (req.userRole.role_name == 'instructor') {
          const data = await repository.getOne({ id, instructor_id: req.userId })

          if (!data) {
            return res.status(403).json({ message: 'You\'re not authorized to edit class which you don\'t own ' })
          }
        }
      }

      await repository.updateOne(newInfo, { id: Number(id) })
      return res.status(200).json({ message: `Id ${id} updated` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Destroy a class
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
   * @desc Recover a class
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

  /**
   * @desc Show all fullfied classes
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async indexFullfied (req, res) {
    try {
      const fullfied = await repository.getFullfied(rules.class.max_per_classroom)
      return res.status(200).json(fullfied)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show class enrollments
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async showEnrollments (req, res) {
    const { id } = req.params
    try {
      const enrollments = await repository.getEnrollments(Number(id))
      return res.status(200).json(enrollments)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
