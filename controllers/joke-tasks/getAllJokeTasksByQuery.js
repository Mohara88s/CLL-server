const { JokeTask: Task } = require("../../models");
const { Language } = require("../../models");

const { NotFound } = require("http-errors");

const getAllJokeTasksByQuery = async (req, res, next) => {
	const { page = 1, limit = 20, query = "", original_language = "", translation_language = "" } = req.query;
	const skip = (page - 1) * limit;
	const originalLanguage = await Language.find({ "language_name": original_language })
	const translationLanguage = await Language.find({ "language_name": translation_language })

	const querySt = (originalLanguage.length && translationLanguage.length)
		? {
			$and: [
				{ "task_title": { $regex: `^${query}` } },
				{ "languages.": `${originalLanguage[0]._id}` },
				{ "languages.": `${translationLanguage[0]._id}` },
			]
		}
		:
		{ "task_title": { $regex: `^${query}` } }

	const tasks = await Task.find(querySt)
		.populate({
			path: "languages",
		})
		.populate({
			path: "translations",
			populate: {
				path: "language",
			},
		})
		.sort({ "task_title": 1 })
		.skip(skip)
		.limit(+limit);
	if (!tasks.length) {
		throw new NotFound("No data by your query");
	}
	res.status(200).json({
		tasks,
	});
};

module.exports = getAllJokeTasksByQuery;
