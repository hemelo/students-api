import { Router } from 'express'
import PersonController from '../controllers/personController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/people', PersonController.index)
  .get('/people/active', PersonController.indexActive)
  .post('/people/:id/activate', PersonController.reactivate, [authenticate.access])
  .post('/people/:id/deactivate', PersonController.deactivate, [authenticate.access])
  .get('/people/:id', PersonController.show)
  .post('/people', PersonController.create, [authenticate.access])
  .put('/people/:id', PersonController.update, [authenticate.access])
  .delete('/people/:id', PersonController.destroy, [authenticate.access])
  .post('/people/:id/recover', PersonController.recover, [authenticate.access])

export default router
