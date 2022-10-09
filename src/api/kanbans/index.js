import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport.js'
import { create, index, show, update, destroy } from './controller.js'

const router = new Router()

router.post('/',
  create)

router.get('/',
  query(
    {
      id: String,
      name: String,
      projectId: String,
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
