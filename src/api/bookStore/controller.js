import { success, notFound } from '../../services/response.js'
import BookStore from './model.js'

export const create = ({ body }, res, next) =>
  BookStore.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  delete cursor.sort
  BookStore.find(query, select, cursor)
    .populate({
      path: 'books',
      select: ['book', 'theNumberOfBooks'],
      populate: {
        path: 'book',
        select: 'name',
      }
    })
    .then(async (bookStores) => {
      const length = await BookStore.countDocuments(bookStores)
      res.setHeader('Access-Control-Expose-Headers', 'length')
      res.setHeader('length', length)
      return bookStores
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  BookStore.findById(params.id)
    .populate('books')
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  BookStore.findById(params.id)
    .then(notFound(res))
    .then((bookStore) => {
      return bookStore ? Object.assign(bookStore, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  BookStore.findById(params.id)
    .then(notFound(res))
    .then((bookStore) => bookStore ? bookStore.remove() : null)
    .then(success(res, 204))
    .catch(next)
