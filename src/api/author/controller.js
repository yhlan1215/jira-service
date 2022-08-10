import { success, notFound } from '../../services/response.js'
import Author from './model.js'

export const create = ({ body }, res, next) =>
  Author.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  delete cursor.sort
  Author.find(query, select, cursor)
    .populate('books', 'name')
    .then(async (authors) => {
      const length = await Author.countDocuments(authors)
      res.setHeader('Access-Control-Expose-Headers', 'length')
      res.setHeader('length', length)
      return authors
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Author.findById(params.id)
    .populate('books')
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Author.findById(params.id)
    .then(notFound(res))
    .then((author) => {
      return author ? Object.assign(author, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Author.findById(params.id)
    .then(notFound(res))
    .then((author) => author ? author.remove() : null)
    .then(success(res, 204))
    .catch(next)
