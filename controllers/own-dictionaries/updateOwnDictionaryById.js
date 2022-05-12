const { OwnDictionary } = require("../../models");
const { NotFound, Conflict } = require("http-errors");

const updateOwnDictionaryById = async (req, res) => {
	const { _id } = req.user;
	const { dictionaryId } = req.params;

	const { ownDictionaryOwner } = await OwnDictionary.findById(dictionaryId);
	if (`${_id}` !== `${ownDictionaryOwner}`) {
		throw new Conflict(
			"You are not the owner of this dictionary and cannot update it."
		);
	}

	const ownDictionary = await OwnDictionary.findByIdAndUpdate(
		dictionaryId,
		req.body,
		{ new: true }
	).populate({
		path: "ownDictionaryTasks",
		select: ["eng", "rus", "utrn", "qtrn"],
	});

	if (!ownDictionary) {
		throw new NotFound(`Own dictionary with id=${dictionaryId} not found`);
	}
	console.log(ownDictionary)
	res.status(200).json({
		ownDictionary,
	});
};
module.exports = updateOwnDictionaryById;
