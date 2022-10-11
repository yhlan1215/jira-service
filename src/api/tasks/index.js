import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller.js'
import { token } from '../../services/passport.js'

const router = new Router()

router.post('/',
  token(),
  create)

router.get('/',
  token(),
  query(
    {
      id: String,
      name: String,
      processorId: String,
      projectId: String,
      kanbanId: String,
      type: String,
      priority: String
    }
  ),
  index)

router.get('/:id',
  token(),
  show)

router.put('/:id',
  token(),
  update)

router.delete('/:id',
  token(),
  destroy)

export default router
