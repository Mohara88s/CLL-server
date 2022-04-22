const { User } = require("../../models");
const { ExpectationFailed } = require("http-errors");

const getOwnUDictionary = async (req, res) => {
	const { _id } = req.user;
	const { ownUDictionary } = await User.findById(_id).populate(
		"ownUDictionary",
		["eng", "utrn", "rus"]
	);

	if (!ownUDictionary) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownUDictionary,
	});
};
module.exports = getOwnUDictionary;
