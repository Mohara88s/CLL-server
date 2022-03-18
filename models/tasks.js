const { Schema, model } = require('mongoose')
const Joi = require('joi')

const taskSchema = Schema({
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

const Task = model('task', taskSchema)

const joiSchema = Joi.object({
  eng: Joi.string()
    .required(),
  qtrn: Joi.string()
    .required(),
  rus: Joi.string()
    .required(),
})

module.exports = {
  Task,
  joiSchema
}
