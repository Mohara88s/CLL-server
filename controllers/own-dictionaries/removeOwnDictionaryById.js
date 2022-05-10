const { User, OwnDictionary } = require("../../models");
const { NotFound, Conflict } = require("http-errors");

const removeOwnDictionaryById = async (req, res, next) => {
	const { _id } = req.user;
	const { dictionaryId } = req.params;

	const { ownDictionaryOwner } = await OwnDictionary.findById(dictionaryId);
	if (`${_id}` !== `${ownDictionaryOwner}`) {
		throw new Conflict(
			"You are not the owner of this dictionary and cannot delete it."
		);
	}

	await User.findByIdAndUpdate(
		_id,
		{ $pull :{ ownDictionaries: dictionaryId} },
	)

	const ownDictionary = await OwnDictionary.findByIdAndDelete(dictionaryId);
	
	if (!ownDictionary) {
		throw new NotFound(`Own dictionary with id=${dictionaryId} not found`);
	}

	res.status(200).json({
		ownDictionary,
	});
};

module.exports = removeOwnDictionaryById;
