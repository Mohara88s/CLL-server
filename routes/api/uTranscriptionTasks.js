const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { uTranscriptionTasks: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllUTranscriptionTasksByQuery))

router.get('/trn-to-utrn', controllerWrapper(ctrl.getTrnToUtrnTransformer))


// router.get('/:taskId', authenticate, controllerWrapper(ctrl.getTaskById))

// router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addTask))

// router.delete('/:taskId', authenticate, controllerWrapper(ctrl.removeTaskById))

// router.put('/:taskId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateTaskById))

module.exports = router
