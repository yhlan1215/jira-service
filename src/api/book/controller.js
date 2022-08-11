import { success, notFound } from '../../services/response.js'
import Book from './model.js'

export const create = ({ body }, res, next) =>
  Book.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  delete cursor.sort
  if (query.language) {
    query = { language: { $in:query.language.split(',') } }
  }
  Book.find(query, select, cursor)
    .populate('author', 'name')
    .then(async (books) => {
      const length = await Book.countDocuments(query)
      res.setHeader('Access-Control-Expose-Headers', 'length')
      res.setHeader('length', length)
      return books
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Book.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      return book ? Object.assign(book, body).save() : null
    })
    .then((book) => book.populate('author').execPopulate())
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => book ? book.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const doublePrice = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      if (!book) {
        return null
      }
      book.price *= 2
      return book.save()
    })
    .then(success(res))
    .catch(next)

export const changePrice = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      if (!book) {
        return null
      }
      book.price = params.newPrice
      return book.save()
    })
    .then(success(res))
    .catch(next)

export const getByCategory = ({ querymen: { query, select, cursor }, params }, res, next) =>
  Book.find(query, select, cursor)
    .then((books) => books.filter((book) => book.category === params.category))
    .then(success(res))
    .catch(next)

export const changeName = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      if (!book) {
        return null
      }
      book.name = params.newName
      return book.save()
    })
    .then(success(res))
    .catch(next)

export const helloName = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      if (!book) {
        return null
      }
      book.name = `hello${book.name}`
      return book.save()
    })
    .then(success(res))
    .catch(next)

export const cloneBook = ({ params }, res, next) =>
  Book.findById(params.id)
    .then(notFound(res))
    .then((book) => {
      if (!book) {
        return null
      }
      const newBook = {
        name: book.name,
        price: book.price
      }
      return newBook
    })
    .then((newBook) => Book.create(newBook))
    .then(success(res))
    .catch(next)
