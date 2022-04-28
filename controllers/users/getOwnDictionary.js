const { OwnDictionary } = require("../../models");
const { ExpectationFailed } = require("http-errors");

const getOwnDictionary = async (req, res) => {
	const { dictionaryId } = req.params
	const  ownDictionary  = await OwnDictionary.findById(dictionaryId)
	.populate("ownDictionaryTasks", ["eng", "rus", "utrn"]);

	if (!ownDictionary) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownDictionary,
	});
};
module.exports = getOwnDictionary;
