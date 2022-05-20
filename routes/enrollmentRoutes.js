import { Router } from 'express'
import EnrollmentController from '../controllers/enrollmentController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/enrollments', EnrollmentController.index)
  .get('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.show)
  .get('/people/:studentId/enrollments', EnrollmentController.indexStudent)
  .post('/people/:studentId/enrollments', EnrollmentController.create, [authenticate.access])
  .put('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.update, [authenticate.access])
  .delete('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.destroy, [authenticate.access])
  .post('/people/:studentId/enrollments/:enrollmentId/recover', EnrollmentController.recover, [authenticate.access])

export default router
