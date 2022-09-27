import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller.js'

const router = new Router()

router.post('/',
  create)

router.get('/',
  query(
    {
      _id: String,
      name: String,
      processorId: String,
      projectId: String,
      kanbanId: String,
      typeId: String
    }
  ),
  index)

router.get('/:id',
  show)

router.put('/:id',
  update)

router.delete('/:id',
  destroy)

export default router
