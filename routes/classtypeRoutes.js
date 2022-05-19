import { Router } from 'express'
import ClasstypeController from '../controllers/classtypeController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router()

router
  .get('/classtype', ClasstypeController.index)
  .get('/classtype/:id', ClasstypeController.show)
  .post('/classtype', ClasstypeController.create, [authenticate])
  .put('/classtype/:id', ClasstypeController.update, [authenticate])
  .delete('/classtype/:id', ClasstypeController.destroy, [authenticate])
  .post('/people/:id/recover', ClasstypeController.recover, [authenticate])

export default router
