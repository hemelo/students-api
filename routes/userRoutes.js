import { Router } from 'express'
import UserController from '../controllers/userController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'
import rules from '../domain/rules.js'

const VALIDATE_EMAIL_ROUTE = rules.user.email_verification.route
const REFRESH_EMAIL_ROUTE = rules.user.refresh_email_link.route
const TOKEN_REFRESH_ROUTE = rules.user.token_refresh.route

const router = Router()

router
  .post('/login', UserController.login)
  .get('/profile', UserController.profile, [authenticate.access])
  .put('/profile', UserController.updateProfile, [authenticate.access])
  .post('/register', UserController.create, [authenticate.logged])
  .post(`/${TOKEN_REFRESH_ROUTE}`, UserController.refresh, [authenticate.refresh])
  .get(`/${VALIDATE_EMAIL_ROUTE}/:id`, UserController.verify, [authorization.signed])
  .post('/logout', UserController.logout, [authenticate.refresh, authenticate.access])
  .post(`/${REFRESH_EMAIL_ROUTE}`, UserController.refreshVerifyLink, [authenticate.access])
  .get('/user/:id', UserController.show, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'moderator'])])
  .delete('/user/:id', UserController.destroy, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'moderator'])])
  .put('/user/:id', UserController.update, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'moderator'])])
  .post('/user/:id/recover', UserController.recover, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'moderator'])])

export default router
