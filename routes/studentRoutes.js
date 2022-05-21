import { Router } from 'express'
import StudentsController from '../controllers/personController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/students', StudentsController.index, [authenticate.access, authorization.hasPermission(['show'])])
  .get('/students/active', StudentsController.indexActive, [authenticate.access, authorization.hasPermission(['show'])])
  .post('/students/:id/activate', StudentsController.reactivate, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])
  .post('/students/:id/deactivate', StudentsController.deactivate, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])
  .get('/students/:id', StudentsController.show, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager', 'instructor'])])
  .post('/students', StudentsController.create, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])
  .put('/students/:id', StudentsController.update, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])
  .delete('/students/:id', StudentsController.destroy, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])
  .post('/students/:id/recover', StudentsController.recover, [authenticate.access, authorization.verified, authorization.hasRole(['principal', 'studentManager'])])

export default router
