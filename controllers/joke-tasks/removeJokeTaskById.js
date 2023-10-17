const { JokeTask, Joke, Language } = require("../../models");
const { BadRequest, Conflict, NotFound } = require("http-errors");

const updateJokeTaskById = async (req, res, next) => {
	const { taskId } = req.params;
	
	const task = await JokeTask.findById(taskId);
	if (!task) {
		throw new NotFound(`The task id=${taskId} not found`);
	}
	await Promise.all(task.translations.map(async (tr) => {
		await Joke.findByIdAndDelete(tr._id)
	}))
	const jokeTask = await JokeTask.findByIdAndDelete(taskId)

	res.status(200).json({
		_id:jokeTask._id,
	});
};

module.exports = updateJokeTaskById;
