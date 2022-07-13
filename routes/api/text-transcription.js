const express = require('express')
const { controllerWrapper, authenticate} = require('../../middlewares')
const { textTranscripton } = require('../../controllers')

const router = express.Router()

router.post('/trancript-text', authenticate, controllerWrapper(textTranscripton.transcriptText))

module.exports = router
