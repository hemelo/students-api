import { UsersRepository } from '../repositories'
import jwt from 'jsonwebtoken'

const repository = new UsersRepository()

export default class UserController {
  static async show (req, res) {
    const { id } = req.params
    try {
      const user = await repository.getOne({ id: Number(id) })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async login (req, res) {
    const userData = req.body
    try {
      const user = await repository.authenticate(userData)
      const token = jwt.sign({ id: user.id }, process.env.APP_KEY, { expiresIn: 86400 })
      return res.status(200).json({ user, token })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async create (req, res) {
    const newUserData = req.body
    try {
      const newUser = await repository.create(newUserData)
      return res.status(200).json(newUser)
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
}
