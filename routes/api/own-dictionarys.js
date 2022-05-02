const express = require('express')
const { controllerWrapper, authenticate} = require('../../middlewares')
const { ownDictionarys: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getOwnDictionarys))

router.patch('/', authenticate, controllerWrapper(ctrl.addOwnDictionary))

router.delete('/:dictionaryId', authenticate, controllerWrapper(ctrl.removeOwnDictionaryById))

router.get('/:dictionaryId', controllerWrapper(ctrl.getOwnDictionaryById))

module.exports = router
