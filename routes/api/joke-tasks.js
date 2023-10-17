const express = require('express')
const { controllerWrapper, authenticate } = require('../../middlewares')
const { jokeTasks: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllJokeTasksByQuery))

router.get('/languages', controllerWrapper(ctrl.getAllJokeTasksLanguages))

router.post('/', authenticate, controllerWrapper(ctrl.addJokeTask))

router.delete('/:taskId', authenticate, controllerWrapper(ctrl.removeJokeTaskById))

router.put('/:taskId', authenticate, controllerWrapper(ctrl.updateJokeTaskById))

module.exports = router
