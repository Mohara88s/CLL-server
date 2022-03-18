const express = require('express')
const { controllerWrapper, validation, authenticate, upload, resizing } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')
const verificationSchema = joiSchema.fork(['password'], (schema) => schema.optional())

const router = express.Router()

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/current', authenticate, controllerWrapper(ctrl.updateSubscription))

router.patch('/avatars', authenticate, upload.single('avatar'), resizing, controllerWrapper(ctrl.updateAvatar))

router.get('/verification/:verificationToken', controllerWrapper(ctrl.emailVerification))

router.post('/verification/', validation(verificationSchema), controllerWrapper(ctrl.emailReVerification))

module.exports = router
