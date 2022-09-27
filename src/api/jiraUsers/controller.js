import { success, notFound } from '../../services/response.js'
import JiraUsers from './model.js'

export const create = ({ body }, res, next) =>
  JiraUsers.create(body)
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  JiraUsers.find(query, select, cursor)
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  JiraUsers.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  JiraUsers.findById(params.id)
    .then(notFound(res))
    .then((jiraUser) => {
      return jiraUser ? Object.assign(jiraUser, body).save() : null
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  JiraUsers.findById(params.id)
    .then(notFound(res))
    .then((jiraUser) => jiraUser ? jiraUser.remove() : null)
    .then(success(res, 204))
    .catch(next)
