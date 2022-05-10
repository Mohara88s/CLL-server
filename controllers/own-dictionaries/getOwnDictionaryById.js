const { OwnDictionary } = require("../../models");
const { NotFound } = require("http-errors");

const getOwnDictionaryById = async (req, res) => {
	const { dictionaryId } = req.params;

	const ownDictionary = await OwnDictionary.findById(dictionaryId)
		.populate({
			path: "ownDictionaryTasks",
			select: ["eng", "rus", "utrn", "qtrn"],
		})
		.populate({
			path: "ownDictionaryOwner",
			select: "name",
		});

	if (!ownDictionary) {
		throw new NotFound(`Own dictionary with id=${dictionaryId} not found`);
	}

	res.status(200).json({
		ownDictionary,
	});
};
module.exports = getOwnDictionaryById;
