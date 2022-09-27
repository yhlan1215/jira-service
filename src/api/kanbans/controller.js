import { success, notFound } from '../../services/response.js'
import Kanbans from './model.js'

export const create = ({ body }, res, next) =>
  Kanbans.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  Kanbans.find(query, select, cursor)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Kanbans.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Kanbans.findById(params.id)
    .then(notFound(res))
    .then((kanban) => {
      return kanban ? Object.assign(kanban, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Kanbans.findById(params.id)
    .then(notFound(res))
    .then((kanban) => kanban ? kanban.remove() : null)
    .then(success(res, 204))
    .catch(next)

