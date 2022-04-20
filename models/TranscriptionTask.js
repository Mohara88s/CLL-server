const { Schema, model } = require('mongoose')
const Joi = require('joi')

const TranscriptionTaskSchema = Schema({
  eng: {
    type: String,
    required: [true, 'Set english version of task'],
  },
  trn: {
    type: String,
    required: [true, 'Set q-transcription version of task'],
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

const TranscriptionTask = model('transcription-task', TranscriptionTaskSchema)

const joiSchema = Joi.object({
  eng: Joi.string()
    .required(),
  trn: Joi.string()
    .required(),
  qtrn: Joi.string()
    .required(),
  rus: Joi.string()
    .required(),
})

module.exports = {
  TranscriptionTask,
  joiSchema
}
