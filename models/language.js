const { Schema, model } = require("mongoose");
const Joi = require("joi");

const LanguageSchema = Schema(
	{
		language_name: {
			type: String,
			required: [true, "Set language name"],
			unique: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

const Language = model("Language", LanguageSchema);

const joiSchema = Joi.object({
	language: Joi.string().required(),
});

module.exports = {
	Language,
	joiSchema,
};
