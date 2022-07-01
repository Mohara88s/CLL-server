const express = require('express')
const { controllerWrapper } = require('../../middlewares')
const { sentencesTasks: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getRandomSentencesTasks))

router.get('/:jokeTaskId', controllerWrapper(ctrl.getSentencesTasksByJokeTaskId))

module.exports = router
