const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ownDictionarySchema = Schema(
	{
		ownDictionaryName: {
			type: String,
			required: [true, "Own dictionary name is required"],
			unique: true,
		},
		ownDictionaryTasks: [
			{
				type: Schema.Types.ObjectId,
				ref: "transcription-task",
			},
		],
		ownDictionaryOwner: { type: Schema.Types.ObjectId, ref: "user" },
	},

	{ versionKey: false, timestamps: true }
);

const OwnDictionary = model("own-dictionary", ownDictionarySchema);

const joiSchema = Joi.object({
	ownDictionaryName: Joi.string().required(),
});

module.exports = {
	OwnDictionary,
	joiSchema,
};
