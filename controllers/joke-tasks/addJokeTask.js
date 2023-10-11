const { User, JokeTask, Joke, Language } = require("../../models");
const { BadRequest, Conflict } = require("http-errors");

const addJokeTask = async (req, res, next) => {
	const { _id } = req.user;
	const { task_title, translations } = req.body;
	if (!task_title) {
		throw new BadRequest("The task title is required");
	}
	if (!translations || translations.length < 2) {
		throw new BadRequest("At least 2 translations are required");
	}
	const task = await JokeTask.findOne({
		task_title: task_title,
	});
	if (task) {
		throw new Conflict("The joke title is already in use");
	}
	await Promise.all(translations.map(async (joke) => {
		const language= await Language.findOne({
			_id:joke.language._id,
		})
		if (!language) {
			throw new Conflict("Use available languages");
		}
	}))
	const languagesArr = []
	const jokesArr = []
	const jokes = await Promise.all(translations.map(async (joke) => {
		const newJoke = new Joke({
			title: joke.title,
			text: joke.text,
			language: joke.language._id,
			creator:_id,
		})

		await newJoke.save();

		const newCreatedJoke = await Joke.findOne({
			title: joke.title,
			text: joke.text,
			language: joke.language._id,
			creator:_id,
		})
		languagesArr.push(newCreatedJoke.language)
		jokesArr.push(newCreatedJoke._id)
	}))
	const newJokeTask = new JokeTask({
		task_title,
		languages: languagesArr,
		translations: jokesArr,
		creator:_id,
	});
console.log(languagesArr)
	await newJokeTask.save();
	const jokeTask = await JokeTask.findById(newJokeTask._id)

	res.status(200).json({
		jokeTask,
	});
};

module.exports = addJokeTask;
