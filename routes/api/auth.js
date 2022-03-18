const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/signin', validation(joiSchema), controllerWrapper(ctrl.signin))

router.get('/signout', authenticate, controllerWrapper(ctrl.signout))

module.exports = router
