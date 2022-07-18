import express from 'express'
import user from './user/index.js'
import auth from './auth/index.js'
import book from './book/index.js'
import author from './author/index.js'
import bookStore from './bookStore/index.js'
import bookIndex from './bookIndex/index.js'
import resetPassword from './resetPassword/index.js'

const { Router } = express

const router = new Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/resetPassword', resetPassword)
router.use('/books', book)
router.use('/authors', author)
router.use('/bookStores', bookStore)
router.use('/bookIndexes', bookIndex)

export { router as api }
