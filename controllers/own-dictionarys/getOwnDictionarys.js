const { User } = require("../../models");
const { ExpectationFailed } = require("http-errors");

const getOwnUDictionarys = async (req, res) => {
	const { _id } = req.user;
	const { ownDictionarys } = await User.findById(_id)
	.populate({
		path: "ownDictionarys",
		select:  ["ownDictionaryName", "ownDictionaryTasks"],
		populate: {
			path: "ownDictionaryTasks",
		}
	})

	if (!ownDictionarys) {
		throw new ExpectationFailed(`Error working with database`);
	}

	res.status(200).json({
		ownDictionarys,
	});
};
module.exports = getOwnUDictionarys;
