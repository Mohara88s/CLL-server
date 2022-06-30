const { Schema, model } = require("mongoose");
const Joi = require("joi");

const JokeSchema = Schema(
	{
		title: {
			type: String,
			required: [true, "Set title of joke in actual language"],
		},
		text: {
			type: String,
			required: [true, "Set text of joke in actual language"],
		},
		language: { type: Schema.Types.ObjectId, ref: "Language", },

	},
	{ versionKey: false, timestamps: true }
);

const Joke = model("Joke", JokeSchema);

const joiSchema = Joi.object({
	title: Joi.string().required(),
	text: Joi.string().required(),
	language: Joi.string().required(),
});

module.exports = {
	Joke,
	joiSchema,
};
