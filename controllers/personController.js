import { PeopleRepository } from '../repositories'
const repository = new PeopleRepository()

export default class PersonController {
  static async index (req, res) {
    try {
      const all = await repository.getMany()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async indexActive (req, res) {
    try {
      const all = await repository.getOnlyActive()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async indexInactive (req, res) {
    try {
      const all = await repository.getOnlyInactive()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async show (req, res) {
    const { id } = req.params
    try {
      const person = await repository.getOne({ id: Number(id) })
      return res.status(200).json(person)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async create (req, res) {
    const newPersonData = req.body
    try {
      const newPerson = await repository.create(newPersonData)
      return res.status(200).json(newPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const newInfo = req.body
    try {
      await repository.updateOne(newInfo, { id: Number(id) })
      const updatedPerson = await repository.getOne({ id: Number(id) })
      return res.status(200).json(updatedPerson)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async destroy (req, res) {
    const { id } = req.params
    try {
      await repository.deleteOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} deleted` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async recover (req, res) {
    const { id } = req.params
    try {
      await repository.recoverOne({ id: Number(id) })
      return res.status(200).json({ message: `Id ${id} recovered` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async showEnrollments (req, res) {
    const { studentId } = req.params
    try {
      const enrollments = await repository.getStudentEnrollments({ id: Number(studentId) })
      return res.status(200).json(enrollments)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

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
