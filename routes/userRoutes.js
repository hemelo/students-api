import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .post('/register', UserController.create, [authenticate.logged])
  .post('/login', UserController.login)
  .post('/logout', UserController.logout, [authenticate.refresh, authenticate.access])
  .post('/token-refresh', UserController.refresh, [authenticate.refresh])
  .get('/user/:id', UserController.show, [authenticate.access])
  .delete('/user/:id', UserController.destroy, [authenticate.access])
  .put('/user/:id', UserController.update, [authenticate.access])
  .post('/user/:id/recover', UserController.recover, [authenticate.access])

export default router
