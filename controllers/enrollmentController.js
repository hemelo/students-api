import { EnrollmentsRepository } from '../repositories'

/**
 * @ignore
 */
const repository = new EnrollmentsRepository()

/**
 * @desc Contains all logic methods to manage Enrollment models through API requests
 */
export default class EnrollmentController {
  /**
   * @desc Show all enrollments
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async index (req, res) {
    const { studentId } = req.params
    try {
      const enrollments = await repository.getMany({ student_id: Number(studentId) })
      return res.status(200).json(enrollments)
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
    const { studentId, enrollmentId } = req.params
    try {
      const enrollment = await repository.getOne({ id: Number(enrollmentId), student_id: Number(studentId) })
      return res.status(200).json(enrollment)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Crate a enrollment
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async create (req, res) {
    const { studentId } = req.params
    const newEnrollmentData = { ...req.body, student_id: Number(studentId) }
    try {
      const newEnrollment = await repository.create(newEnrollmentData)
      return res.status(200).json(newEnrollment)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Update a enrollment
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async update (req, res) {
    const { studentId, enrollmentId } = req.params
    const newInfo = req.body
    try {
      await repository.updateOne(newInfo, { id: Number(enrollmentId), student_id: Number(studentId) })
      const updatedEnrollment = await repository.getOne({ id: Number(enrollmentId) })
      return res.status(200).json(updatedEnrollment)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Destroy a enrollment
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async destroy (req, res) {
    const { enrollmentId } = req.params
    try {
      await repository.deleteOne({ id: Number(enrollmentId) })
      return res.status(200).json({ message: `Id ${enrollmentId} deleted` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Recover a enrollment
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async recover (req, res) {
    const { studentId, enrollmentId } = req.params
    try {
      await repository.recoverOne({ id: Number(enrollmentId), student_id: Number(studentId) })
      return res.status(200).json({ message: `Id ${enrollmentId} recovered` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  /**
   * @desc Get specific student enrollments
   * @param {Express.Request} req - Auto injected argument by Express
   * @param {Express.Response} res - Auto injected argument by Express
   * @returns {Express.Response} JSON
   */
  static async indexStudent (req, res) {
    const { studentId } = req.params
    try {
      const enrollments = await repository.getStudentEnrolls(Number(studentId))
      return res.status(200).json(enrollments)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}
