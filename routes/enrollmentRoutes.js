import { Router } from 'express'
import EnrollmentController from '../controllers/enrollmentController'

const router = Router()

router
  .get('/enrollments', EnrollmentController.index)
  .get('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.show)
  .get('/people/:studentId/enrollments', EnrollmentController.indexStudent)
  .post('/people/:studentId/enrollments', EnrollmentController.create)
  .put('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.update)
  .delete('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.destroy)
  .post('/people/:studentId/enrollments/:enrollmentId/recover', EnrollmentController.recover)

export default router
