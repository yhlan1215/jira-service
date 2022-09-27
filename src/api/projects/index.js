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
      organization: String,
      personId: String,
      pin: Boolean
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
