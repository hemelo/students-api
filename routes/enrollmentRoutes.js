import { Router } from 'express'
import EnrollmentController from '../controllers/enrollmentController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/enrollments', EnrollmentController.index, [authenticate.access, authorization.hasPermission(['show'])])
  .get('/students/:studentId/enrollments/:enrollmentId', EnrollmentController.show, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager'])])
  .get('/students/:studentId/enrollments', EnrollmentController.indexStudent, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager', 'instructor'])])
  .post('/students/:studentId/enrollments', EnrollmentController.create, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager'])])
  .put('/students/:studentId/enrollments/:enrollmentId', EnrollmentController.update, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager'])])
  .delete('/students/:studentId/enrollments/:enrollmentId', EnrollmentController.destroy, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager'])])
  .post('/students/:studentId/enrollments/:enrollmentId/recover', EnrollmentController.recover, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'enrollmentsManager'])])

export default router
