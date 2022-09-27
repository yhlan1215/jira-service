import express from 'express'
import jiraUsers from './jiraUsers/index.js'
import projects from './projects/index.js'
import kanbans from './kanbans/index.js'
import tasks from './tasks/index.js'

const { Router } = express

const router = new Router()

router.use('/jiraUsers', jiraUsers)
router.use('/projects', projects)
router.use('/kanbans', kanbans)
router.use('/tasks', tasks)

export { router as api }
