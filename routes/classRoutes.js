import { Router } from 'express'
import ClassController from '../controllers/classController'

const router = Router()

router
  .get('/classes', ClassController.index)
  .get('/classes/:id', ClassController.show)
  .post('/classes', ClassController.create)
  .put('/classes/:id', ClassController.update)
  .delete('/classes/:id', ClassController.destroy)
  .post('/classes/:id/recover', ClassController.recover)
  .get('/classes/:id/enrollments/cancelled', ClassController.showCancelled)
  .get('/classes/:id/enrollments/confirmed', ClassController.showConfirmed)
  .get('/classes/:id/enrollments', ClassController.showEnrollments)
  .get('/classes/enrollments/fullfied', ClassController.indexFullfied)

export default router
