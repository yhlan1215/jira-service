import { success, notFound } from '../../services/response/'
import { BookIndex } from '.'

export const create = ({ body }, res, next) =>
  BookIndex.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BookIndex.find(query, select, cursor)
    .populate('books')
    .then(success(res))
    .catch(next)

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
