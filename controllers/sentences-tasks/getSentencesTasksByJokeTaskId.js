const { nanoid } = require('nanoid')
const { JokeTask: Task } = require("../../models");
const { Language } = require("../../models");

const { BadRequest, NotFound } = require("http-errors");

const getSentencesTasksByJokeTaskId = async (req, res, next) => {
	const { original_language, translation_language } = req.query;
	const { jokeTaskId } = req.params;
	if (!original_language) {
		throw new BadRequest("The original language is required");
	}
	if (!translation_language) {
		throw new BadRequest("The translation language is required");
	}
	const originalLanguage = await Language.find({ "language_name": original_language })
	const translationLanguage = await Language.find({ "language_name": translation_language })

	const querySt = {
		$and: [
			{ _id: jokeTaskId },
			{ "languages.": `${originalLanguage[0]._id}` },
			{ "languages.": `${translationLanguage[0]._id}` },
		]
	}

	const jokeTasks = await Task.find(querySt)
		.populate({
			path: "languages",
		})
		.populate({
			path: "translations",
			populate: {
				path: "language",
			},
		})
	if (!jokeTasks.length) {
		throw new NotFound("No data by your parameters");
	}

	const tasks = jokeTasks
		.map(task => {
			const id = task._id
			const original = task.translations
				.find(translation => translation.language.language_name === original_language).text
			const translation = task.translations
				.find(translation => translation.language.language_name === translation_language).text
			return { id, original, translation }
		})
		.map(e => {
			const array = []
			const originalArr = e.original.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
			const translationArr = e.translation.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g);
			if (originalArr.length === translationArr.length) {
				originalArr.map((elem, id) => {
					// if (elem.length > 30)
					// {
						const element = {
						id: nanoid(),
						original: elem,
						translation: translationArr[id],
					}
					array.push(element)}
				// }
				)
			}
			return [...array]
		})
		.flat()
		.sort(() => {
			return 0.5 - Math.random();
		})

	res.status(200).json({
		tasks,
	});
};

module.exports = getSentencesTasksByJokeTaskId;
