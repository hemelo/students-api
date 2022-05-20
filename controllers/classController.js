import { ClassesRepository } from '../repositories'
import rules from '../domain/rules.js'

const repository = new ClassesRepository()

const MAX_STUDENTS_PER_CLASS = rules.class.max_per_classroom

const sortTypes = {
  descending: 'DESC',
  ascending: 'ASC'
}

export default class ClassController {
  static async index (req, res) {
    try {
      const { sort } = req.query

      const sortIndex = Object.keys(sortTypes)
        .findIndex(e => e.startsWith(String(sort).toLowerCase()))

      let all
      if (sortIndex !== -1) {
        all = await repository.getMany({}, [['start_date', Object.values(sortTypes)[sortIndex]]])
      }

      all = await repository.getMany()
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async show (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOne({ id: Number(id) })
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async showCancelled (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOneWithCancelledEnrolls({ id: Number(id) })
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async showConfirmed (req, res) {
    const { id } = req.params
    try {
      const type = await repository.getOneWithConfirmedEnrolls({ id: Number(id) })
      return res.status(200).json(type)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async create (req, res) {
    const newTypeData = req.body
    try {
      const newType = await repository.create(newTypeData)
      return res.status(200).json(newType)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

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

  static async indexFullfied (req, res) {
    try {
      const fullfied = await repository.getFullfied(MAX_STUDENTS_PER_CLASS)
      return res.status(200).json(fullfied)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

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
