const express = require('express')
const { controllerWrapper, authenticate} = require('../../middlewares')
const { ownDictionaries: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getOwnDictionaries))

router.patch('/', authenticate, controllerWrapper(ctrl.addOwnDictionary))

router.get('/:dictionaryId', controllerWrapper(ctrl.getOwnDictionaryById))

router.delete('/:dictionaryId', authenticate, controllerWrapper(ctrl.removeOwnDictionaryById))

router.patch('/:dictionaryId', authenticate, controllerWrapper(ctrl.updateOwnDictionaryById))

module.exports = router
