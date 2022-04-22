const { User } = require("../../models");
const { BadRequest, ExpectationFailed } = require("http-errors");

const updateOwnUDictionary = async (req, res, next) => {
	const { _id } = req.user;
	const { wordsSet } = req.body;
	if (!wordsSet) {
		throw new BadRequest("missing field wordsSet");
	}

	const { ownUDictionary } = await User.findByIdAndUpdate(
		_id,
		{ $addToSet: { ownUDictionary: { $each: wordsSet } } },
		{ new: true }
	).populate("ownUDictionary", ["eng", "utrn", "rus"]);

	if (!ownUDictionary) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownUDictionary,
	});
};

module.exports = updateOwnUDictionary;
