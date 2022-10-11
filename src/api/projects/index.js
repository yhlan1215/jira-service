import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport.js'
import { create, index, show, update, destroy } from './controller.js'

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
      organization: String,
      personId: String,
      pin: Boolean
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
