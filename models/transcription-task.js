const { Schema, model } = require("mongoose");
const Joi = require("joi");

const TranscriptionTaskSchema = Schema(
	{
		eng: {
			type: String,
			required: [true, "Set english version of task"],
		},
		phtrn: {
			type: String,
			required: [true, "Set ph-transcription version of task"],
		},
		phetrn: {
			type: String,
			required: [true, "Set ph+-transcription version of task"],
		},
		qtrn: {
			type: String,
			required: [true, "Set q-transcription version of task"],
		},
		utrn: {
			type: String,
			required: [true, "Set u-transcription version of task"],
		},
		rus: {
			type: String,
			required: [true, "Set rusian version of task"],
		},
	},
	{ versionKey: false, timestamps: true }
);

const TranscriptionTask = model("TranscriptionTask", TranscriptionTaskSchema);

const joiSchema = Joi.object({
	eng: Joi.string().required(),
	phtrn: Joi.string().required(),
	phetrn: Joi.string().required(),
	qtrn: Joi.string().required(),
	utrn: Joi.string().required(),
	rus: Joi.string().required(),
});

module.exports = {
	TranscriptionTask,
	joiSchema,
};
