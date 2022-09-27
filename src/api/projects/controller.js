import { success, notFound } from '../../services/response.js'
import Projects from './model.js'

export const create = ({ body }, res, next) =>
  Projects.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  Projects.find(query, select, cursor)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Projects.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Projects.findById(params.id)
    .then(notFound(res))
    .then((project) => {
      return project ? Object.assign(project, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Projects.findById(params.id)
    .then(notFound(res))
    .then((project) => project ? project.remove() : null)
    .then(success(res, 204))
    .catch(next)

