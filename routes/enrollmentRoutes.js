import { Router } from 'express'
import EnrollmentController from '../controllers/enrollmentController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/enrollments', EnrollmentController.index)
  .get('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.show)
  .get('/people/:studentId/enrollments', EnrollmentController.indexStudent)
  .post('/people/:studentId/enrollments', EnrollmentController.create, [authenticate.access, authorization.verified])
  .put('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.update, [authenticate.access, authorization.verified])
  .delete('/people/:studentId/enrollments/:enrollmentId', EnrollmentController.destroy, [authenticate.access, authorization.verified])
  .post('/people/:studentId/enrollments/:enrollmentId/recover', EnrollmentController.recover, [authenticate.access, authorization.verified])

export default router
