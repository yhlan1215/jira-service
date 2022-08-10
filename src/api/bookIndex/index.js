import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, plusOne, minusOne } from './controller.js'

const router = new Router()

router.post('/',
  create)

router.get('/',
  query({
    bookStore: String
  }),
  index)

router.get('/:id',
  show)

router.put('/:id',
  update)

router.delete('/:id',
  destroy)

router.put('/:id/plus',
  plusOne)

router.put('/:id/minus',
  minusOne)

export default router
