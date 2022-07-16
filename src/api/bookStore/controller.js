import { success, notFound } from '../../services/response.js'
import BookStore from './model.js'

export const create = ({ body }, res, next) =>
  BookStore.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  BookStore.find(query, select, cursor)
    .populate('bookIndexs')
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  BookStore.findById(params.id)
    .populate('bookIndexs')
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
