const { OwnDictionary } = require("../../models");
const { NotFound } = require("http-errors");

const getOwnDictionaryById = async (req, res) => {
	const { dictionaryId } = req.params
	const  ownDictionary  = await OwnDictionary.findById(dictionaryId)
	.populate("ownDictionaryTasks", ["eng", "rus", "utrn"]);

	if (!ownDictionary) {
		throw new NotFound(`own dictionary with id=${dictionaryId} not found`)
	}

	res.status(200).json({
		ownDictionary,
	});
};
module.exports = getOwnDictionaryById;
