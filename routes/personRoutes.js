import { Router } from 'express'
import PersonController from '../controllers/personController'

const router = Router()

router
  .get('/people', PersonController.index)
  .get('/people/active', PersonController.indexActive)
  .post('/people/:id/activate', PersonController.reactivate)
  .post('/people/:id/deactivate', PersonController.deactivate)
  .get('/people/:id', PersonController.show)
  .post('/people', PersonController.create)
  .put('/people/:id', PersonController.update)
  .delete('/people/:id', PersonController.destroy)
  .post('/people/:id/recover', PersonController.recover)

export default router
