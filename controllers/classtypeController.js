import { ClasstypesRepository } from '../repositories'
const repository = new ClasstypesRepository()

export default class ClasstypeController {
  static async index (req, res) {
    try {
      const all = await repository.getMany()
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
}
