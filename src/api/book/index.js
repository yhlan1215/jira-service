import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, doublePrice, changePrice, getByCategory, changeName, helloName, cloneBook } from './controller.js'

const router = new Router()

router.post('/',
  create)

router.get('/',
  query(),
  index)

router.get('/:id',
  show)

router.put('/:id',
  update)

router.delete('/:id',
  destroy)

router.post('/:id/doublePrice',
  doublePrice)

router.post('/:id/changePrice/:newPrice',
  changePrice)

router.get('/category/:category',
  query(),
  getByCategory)

router.post('/:id/changeName/:newName',
  changeName)

router.put('/:id/helloName',
  helloName)

router.post('/:id/cloneBook',
  cloneBook)
export default router
