const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const authRouter = require('./routes/api/auth')
const jokeTasksRouter = require('./routes/api/joke-tasks')
const sentencesTasksRouter = require('./routes/api/sentences-tasks')
const transcriptionTasksRouter = require('./routes/api/transcription-tasks')
const textTranscriptionRouter = require('./routes/api/text-transcription')
const ownDictionariesRouter = require('./routes/api/own-dictionaries')
const usersRouter = require('./routes/api/users')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cll-server API',
      version: '1.0.0',
      description: 'Express cll-server API'
    },
    // servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/api/*.js']
}
const specs = swaggerJsDoc(options)

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use('/api/auth', authRouter)
app.use('/api/joke-tasks', jokeTasksRouter)
app.use('/api/sentences-tasks', sentencesTasksRouter)
app.use('/api/transcription-tasks', transcriptionTasksRouter)
app.use('/api/text-transcription', textTranscriptionRouter)
app.use('/api/own-dictionaries', ownDictionariesRouter)
app.use('/api/users', usersRouter)
app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).send('<p>Not found. You can go to <a href="/api/api-docs"> API docs </a></p>')
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
