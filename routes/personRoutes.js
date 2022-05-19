import { Router } from 'express'
import PersonController from '../controllers/personController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/people', PersonController.index)
  .get('/people/active', PersonController.indexActive)
  .post('/people/:id/activate', PersonController.reactivate, [authenticate])
  .post('/people/:id/deactivate', PersonController.deactivate, [authenticate])
  .get('/people/:id', PersonController.show)
  .post('/people', PersonController.create, [authenticate])
  .put('/people/:id', PersonController.update, [authenticate])
  .delete('/people/:id', PersonController.destroy, [authenticate])
  .post('/people/:id/recover', PersonController.recover, [authenticate])

export default router
