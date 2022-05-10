const { User, OwnDictionary } = require("../../models");
const { BadRequest, Conflict } = require("http-errors");

const addOwnDictionary = async (req, res, next) => {
	const { _id } = req.user;
	const { ownDictionaryName, ownDictionaryTasks } = req.body;
	if (!ownDictionaryName) {
		throw new BadRequest("The name of the dictionary is required");
	}
	if (!ownDictionaryTasks.length) {
		throw new BadRequest("Words are required for the dictionary");
	}
	const dictionary = await OwnDictionary.findOne({
		ownDictionaryName: ownDictionaryName,
		ownDictionaryOwner: _id,
	});
	if (dictionary) {
		throw new Conflict("Dictionary name is already in use");
	}
	const newOwnDictionary = new OwnDictionary({
		ownDictionaryName,
		ownDictionaryTasks,
		ownDictionaryOwner: _id,
	});
	await newOwnDictionary.save();
	const ownDictionary = await OwnDictionary.findById(newOwnDictionary._id);
	await User.findByIdAndUpdate(
		_id,
		{ $addToSet: { ownDictionaries: ownDictionary } },
	)

	res.status(200).json({
		ownDictionary,
	});
};

module.exports = addOwnDictionary;
