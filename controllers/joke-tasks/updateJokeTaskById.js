const { JokeTask, Joke, Language } = require("../../models");
const { BadRequest, Conflict, NotFound } = require("http-errors");

const updateJokeTaskById = async (req, res, next) => {
	const { _id } = req.user;
	const { taskId } = req.params;
	const { task_title, translations } = req.body;
	if (!task_title) {
		throw new BadRequest("The task title is required");
	}
	if (!translations || translations.length < 2) {
		throw new BadRequest("At least 2 translations are required");
	}
	const task = await JokeTask.findById(taskId);
	if (!task) {
		throw new NotFound("According to the Id, no joke was found");
	}
	const taskByTitle = await JokeTask.findOne({
		task_title: task_title,
	});

	if (`${task._id}` !== `${taskByTitle._id}`) {
		throw new Conflict("The joke title is already in use");
	}
	await Promise.all(translations.map(async (joke) => {
		const language = await Language.findOne({
			_id: joke.language._id,
		})
		if (!language) {
			throw new Conflict("Use available languages");
		}
	}))

	await Promise.all(task.translations.map(async (tr) => {
		await Joke.findByIdAndDelete(tr._id)
	}))
	await JokeTask.findByIdAndDelete(taskId)

	const languagesArr = []
	const jokesArr = []
	const jokes = await Promise.all(translations.map(async (joke) => {
		const newJoke = new Joke({
			title: joke.title,
			text: joke.text,
			language: joke.language._id,
			creator: _id,
		})

		await newJoke.save();

		const newCreatedJoke = await Joke.findOne({
			title: joke.title,
			text: joke.text,
			language: joke.language._id,
			creator: _id,
		})
		languagesArr.push(newCreatedJoke.language)
		jokesArr.push(newCreatedJoke._id)
	}))
	const newJokeTask = new JokeTask({
		task_title,
		languages: languagesArr,
		translations: jokesArr,
		creator: _id,
	});
	await newJokeTask.save();
	const jokeTask = await JokeTask.findById(newJokeTask._id)
		.populate({
			path: "languages",
		})
		.populate({
			path: "translations",
			populate: {
				path: "language",
			},
		})


	res.status(200).json({
		_id: taskId,
		jokeTask,
	});
};

module.exports = updateJokeTaskById;
