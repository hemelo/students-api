import { Router } from 'express'
import ClasstypeController from '../controllers/classtypeController'

const router = Router()

router
  .get('/classtype', ClasstypeController.index)
  .get('/classtype/:id', ClasstypeController.show)
  .post('/classtype', ClasstypeController.create)
  .put('/classtype/:id', ClasstypeController.update)
  .delete('/classtype/:id', ClasstypeController.destroy)
  .post('/people/:id/recover', ClasstypeController.recover)

export default router
