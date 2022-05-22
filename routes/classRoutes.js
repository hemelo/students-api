import { Router } from 'express'
import ClassController from '../controllers/classController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'
import utils from '../middleware/utils.js'

const router = Router()

router
  .get('/classes', ClassController.index, [utils.sort])
  .get('/classes/:id', ClassController.show, [authenticate.access, authorization.hasPermission(['show'])])
  .post('/classes', ClassController.create, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager'])])
  .put('/classes/:id', ClassController.update, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager', 'instructor'])])
  .delete('/classes/:id', ClassController.destroy, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager'])])
  .post('/classes/:id/recover', ClassController.recover, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager'])])
  .get('/classes/:id/enrollments/cancelled', ClassController.showCancelled, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager', 'instructor'])])
  .get('/classes/:id/enrollments/confirmed', ClassController.showConfirmed, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager', 'instructor'])])
  .get('/classes/:id/enrollments', ClassController.showEnrollments, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'classManager', 'instructor'])])
  .get('/classes/enrollments/fullfied', ClassController.indexFullfied, [authenticate.access, authorization.hasPermission(['show'])])

export default router
