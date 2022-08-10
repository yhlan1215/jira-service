import { success, notFound } from '../../services/response.js'
import BookIndex from './model.js'

export const create = ({ body }, res, next) =>
  BookIndex.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  delete cursor.sort
  BookIndex.find(query, select, cursor)
    .populate('books')
    .then(async (bookIndexes) => {
      const length = await BookIndex.countDocuments(query)
      res.setHeader('Access-Control-Expose-Headers', 'length')
      res.setHeader('length', length)
      return (bookIndexes)
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  BookIndex.findById(params.id)
    .populate('books')
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  BookIndex.findById(params.id)
    .then(notFound(res))
    .then((bookIndex) => {
      return bookIndex ? Object.assign(bookIndex, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  BookIndex.findById(params.id)
    .then(notFound(res))
    .then((bookIndex) => bookIndex ? bookIndex.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const plusOne = ({ params }, res, next) =>
  BookIndex.findById(params.id)
    .then(notFound(res))
    .then((bookIndex) => {
      bookIndex.theNumberOfBooks++
      return bookIndex.save()
    })
    .then(success(res))
    .catch(next)

export const minusOne = ({ params }, res, next) =>
  BookIndex.findById(params.id)
    .then(notFound(res))
    .then((bookIndex) => {
      bookIndex.theNumberOfBooks--
      return bookIndex.save()
    })
    .then(success(res))
    .catch(next)