import { Router } from 'express'
import PersonController from '../controllers/personController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/people', PersonController.index)
  .get('/people/active', PersonController.indexActive)
  .post('/people/:id/activate', PersonController.reactivate, [authenticate.access, authorization.verified])
  .post('/people/:id/deactivate', PersonController.deactivate, [authenticate.access, authorization.verified])
  .get('/people/:id', PersonController.show)
  .post('/people', PersonController.create, [authenticate.access, authorization.verified])
  .put('/people/:id', PersonController.update, [authenticate.access, authorization.verified])
  .delete('/people/:id', PersonController.destroy, [authenticate.access, authorization.verified])
  .post('/people/:id/recover', PersonController.recover, [authenticate.access, authorization.verified])

export default router
