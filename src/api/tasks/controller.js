import { success, notFound } from '../../services/response.js'
import Tasks from './model.js'

export const create = ({ body }, res, next) =>
  Tasks.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  Tasks.find(query, select, cursor)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then((task) => {
      return task ? Object.assign(task, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Tasks.findById(params.id)
    .then(notFound(res))
    .then((task) => task ? task.remove() : null)
    .then(success(res, 204))
    .catch(next)

