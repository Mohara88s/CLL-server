const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { jokeTasks: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllJokeTasksByQuery))

router.get('/languages', controllerWrapper(ctrl.getAllJokeTasksLanguages))

module.exports = router
