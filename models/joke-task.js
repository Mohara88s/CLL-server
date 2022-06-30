const { Schema, model } = require("mongoose");
const Joi = require("joi");

const JokeTaskSchema = Schema(
	{	
		task_title: {
			type: String,
			required: [true, "Set task title in English"],
			unique: true,
		},
		languages: [{ type: Schema.Types.ObjectId, ref: "Language", }],
		translations: [{ type: Schema.Types.ObjectId, ref: "Joke", }],
	},
	{ versionKey: false, timestamps: true }
);

const JokeTask = model("JokeTask", JokeTaskSchema);

const joiSchema = Joi.object({
	languages: Joi.array(),
	jokes: Joi.array(),
});

module.exports = {
	JokeTask,
	joiSchema,
};
