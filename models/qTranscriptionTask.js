const { Schema, model } = require('mongoose')
const Joi = require('joi')

const qTranscriptionTaskSchema = Schema({
  eng: {
    type: String,
    required: [true, 'Set english version of task'],
  },
  qtrn: {
    type: String,
    required: [true, 'Set q-transcription version of task'],
  },
  rus: {
    type: String,
    required: [true, 'Set translation version of task'],
  }
}, { versionKey: false, timestamps: true })

const QTranscriptionTask = model('q-transcription-task', qTranscriptionTaskSchema)

const joiSchema = Joi.object({
  eng: Joi.string()
    .required(),
  qtrn: Joi.string()
    .required(),
  rus: Joi.string()
    .required(),
})

module.exports = {
  QTranscriptionTask,
  joiSchema
}
