import { StudentRepository } from '../repositories'

/**
 * @ignore
 */
const repository = new StudentRepository()

/**
 * @desc Contains all logic methods to manage Student models through API requests
 */
export default class StudentsController {
  /**
   * @desc Show all students
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
   * @desc Show all active students
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async indexActive (req, res) {
    try {
      const all = await repository.getOnlyActive()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show all inactive students
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async indexInactive (req, res) {
    try {
      const all = await repository.getOnlyInactive()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Show specific student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async show (req, res) {
    const { id } = req.params
    try {
      const person = await repository.getOne({ id: Number(id) })
      return res.status(200).json(person)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Crate a student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async create (req, res) {
    const newStudentData = req.body
    try {
      const newStudent = await repository.create(newStudentData)
      return res.status(200).json(newStudent)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Update a student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async update (req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await repository.updateOne(newInfo, { id: Number(id) })
      const updatedStudent = await repository.getOne({ id: Number(id) })
      return res.status(200).json(updatedStudent)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Destroy a student
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
   * @desc Recover a student
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
   * @desc Show enrollemnts for a student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async showEnrollments (req, res) {
    const { studentId } = req.params
    try {
      const enrollments = await repository.getStudentEnrollments({ id: Number(studentId) })
      return res.status(200).json(enrollments)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Deactivate student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async deactivate (req, res) {
    const { studentId } = req.params
    try {
      await repository.deactivateAndUnenrollStudent(Number(studentId))
      return res.status(200)
        .json({ message: `Enrollments for ${studentId} have been cancelled` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Activate a student
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async reactivate (req, res) {
    const { studentId } = req.params
    try {
      await repository.reactivateAndRenrollStudent(Number(studentId))
      return res.status(200)
        .json({ message: `Enrollments for ${studentId} have been activated again` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
