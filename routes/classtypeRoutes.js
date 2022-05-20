import { Router } from 'express'
import ClasstypeController from '../controllers/classtypeController.js'
import authenticate from '../middleware/authenticate.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router
  .get('/classtype', ClasstypeController.index)
  .get('/classtype/:id', ClasstypeController.show)
  .post('/classtype', ClasstypeController.create, [authenticate.access, authorization.verified])
  .put('/classtype/:id', ClasstypeController.update, [authenticate.access, authorization.verified])
  .delete('/classtype/:id', ClasstypeController.destroy, [authenticate.access, authorization.verified])
  .post('/people/:id/recover', ClasstypeController.recover, [authenticate.access, authorization.verified])

export default router
