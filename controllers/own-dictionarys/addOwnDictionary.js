const { User, OwnDictionary } = require("../../models");
const { BadRequest, ExpectationFailed } = require("http-errors");

const addOwnDictionary = async (req, res, next) => {
	const { _id } = req.user;
	const { ownDictionaryName, ownDictionaryTasks } = req.body;
	if (!ownDictionaryName) {
		throw new BadRequest("The name of the dictionary is required");
	}
	if (!ownDictionaryTasks.length) {
		throw new BadRequest("Words are required for the dictionary");
	}
	const ownDictionary = new OwnDictionary({
		ownDictionaryName,
		ownDictionaryTasks,
		ownDictionaryOwner:_id
	})
	await ownDictionary.save();
	const createdOwnDictionary = await OwnDictionary.findOne({ ownDictionaryName });
	const  {ownDictionarys}  = await User.findByIdAndUpdate(
		_id,
		{ $addToSet: { ownDictionarys: createdOwnDictionary} },
		{ new: true }
	)
	.populate("ownDictionarys", ["ownDictionaryName", "ownDictionaryTasks"]);

	if (!ownDictionarys) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownDictionarys,
	});
};

module.exports = addOwnDictionary;
