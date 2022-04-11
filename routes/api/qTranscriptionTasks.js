const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
// const { joiSchema } = require('../../models/tasks')
const { qTranscriptionTasks: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllQTranscriptionTasksByQuery))

// router.get('/:taskId', authenticate, controllerWrapper(ctrl.getTaskById))

// router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addTask))

// router.delete('/:taskId', authenticate, controllerWrapper(ctrl.removeTaskById))

// router.put('/:taskId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateTaskById))

module.exports = router
