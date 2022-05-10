const { User } = require("../../models");
const { ExpectationFailed } = require("http-errors");

const getOwnUDictionaries = async (req, res) => {
	const { _id } = req.user;
	const { ownDictionaries } = await User.findById(_id).populate({
		path: "ownDictionaries",
		select: ["ownDictionaryName", "ownDictionaryTasks"],
		populate: {
			path: "ownDictionaryTasks",
			select: ["eng", "rus", "utrn", "qtrn"],
		},
	});

	if (!ownDictionaries) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownDictionaries,
	});
};
module.exports = getOwnUDictionaries;
