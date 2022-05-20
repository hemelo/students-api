import { Router } from 'express'
import ClasstypeController from '../controllers/classtypeController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/classtype', ClasstypeController.index)
  .get('/classtype/:id', ClasstypeController.show)
  .post('/classtype', ClasstypeController.create, [authenticate.access])
  .put('/classtype/:id', ClasstypeController.update, [authenticate.access])
  .delete('/classtype/:id', ClasstypeController.destroy, [authenticate.access])
  .post('/people/:id/recover', ClasstypeController.recover, [authenticate.access])

export default router
