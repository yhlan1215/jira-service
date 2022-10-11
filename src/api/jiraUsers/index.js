import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport.js'
import { create, index, show, update, destroy } from './controller.js'

const router = new Router()

router.post('/',
  create)

router.get('/',
  token(),
  query(
    {
      name: String,
      id: String
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
