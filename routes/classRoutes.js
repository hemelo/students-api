import { Router } from 'express'
import ClassController from '../controllers/classController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/classes', ClassController.index)
  .get('/classes/:id', ClassController.show)
  .post('/classes', ClassController.create, [authenticate.access])
  .put('/classes/:id', ClassController.update, [authenticate.access])
  .delete('/classes/:id', ClassController.destroy, [authenticate.access])
  .post('/classes/:id/recover', ClassController.recover, [authenticate.access])
  .get('/classes/:id/enrollments/cancelled', ClassController.showCancelled)
  .get('/classes/:id/enrollments/confirmed', ClassController.showConfirmed)
  .get('/classes/:id/enrollments', ClassController.showEnrollments)
  .get('/classes/enrollments/fullfied', ClassController.indexFullfied)

export default router
