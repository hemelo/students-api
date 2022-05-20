import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'
import rules from '../domain/rules.js'

const VALIDATE_EMAIL_ROUTE = rules.user.email_verification.route
const TOKEN_REFRESH_ROUTE = rules.user.token_refresh.route

const router = Router()

router
  .post('/register', UserController.create, [authenticate.logged])
  .post('/login', UserController.login)
  .post('/logout', UserController.logout, [authenticate.refresh, authenticate.access])
  .get('/user/:id', UserController.show, [authenticate.access])
  .delete('/user/:id', UserController.destroy, [authenticate.access, authorization.verified])
  .put('/user/:id', UserController.update, [authenticate.access, authorization.verified])
  .post('/user/:id/recover', UserController.recover, [authenticate.access, authorization.verified])
  .post(`/${TOKEN_REFRESH_ROUTE}`, UserController.refresh, [authenticate.refresh])
  .get(`/${VALIDATE_EMAIL_ROUTE}/:id`, UserController.verify, [authorization.signed])

export default router
