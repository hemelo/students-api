import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authenticate from '../middleware/authenticate.js'
import forbiddenSignup from '../middleware/forbiddenSignup.js'

const router = Router()

router
  .post('/register', UserController.create, [forbiddenSignup])
  .post('/login', UserController.login)
  .get('/logout', UserController.logout, [authenticate])
  .get('/user/:id', UserController.show, [authenticate])
  .delete('/user/:id', UserController.destroy, [authenticate])
  .put('/user/:id', UserController.update, [authenticate])
  .post('/user/:id/recover', UserController.recover, [authenticate])

export default router
