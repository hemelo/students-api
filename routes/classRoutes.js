import { Router } from 'express'
import ClassController from '../controllers/classController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/classes', ClassController.index)
  .get('/classes/:id', ClassController.show)
  .post('/classes', ClassController.create, [authenticate.access, authorization.verified])
  .put('/classes/:id', ClassController.update, [authenticate.access, authorization.verified])
  .delete('/classes/:id', ClassController.destroy, [authenticate.access, authorization.verified])
  .post('/classes/:id/recover', ClassController.recover, [authenticate.access, authorization.verified])
  .get('/classes/:id/enrollments/cancelled', ClassController.showCancelled)
  .get('/classes/:id/enrollments/confirmed', ClassController.showConfirmed)
  .get('/classes/:id/enrollments', ClassController.showEnrollments)
  .get('/classes/enrollments/fullfied', ClassController.indexFullfied)

export default router
