const { TranscriptionTask: Task } = require("../../models");
const { NotFound } = require("http-errors");

const getRandomTranscriptionTask = async (req, res, next) => {
	const { numberofsymbols } = req.query;

	const querySt = {
		$and: [
			{ $expr: { $gt: [{ $strLenCP: '$eng' }, Number(numberofsymbols) - 1] } },
			{ $expr: { $lt: [{ $strLenCP: '$eng' }, Number(numberofsymbols) + 1] } },
			{ $expr: { $gt: [{ $strLenCP: '$utrn' }, Number(numberofsymbols) - 1] } },
			{ $expr: { $lt: [{ $strLenCP: '$utrn' }, Number(numberofsymbols) + 1] } }
		],
	}
	const tasks = await Task.find(querySt)
	if (!tasks.length) {
		throw new NotFound("No data");
	}

	const filtredTasks = tasks.filter(task=>!task.eng.includes(" "))

	const task = filtredTasks[Math.floor(Math.random() * filtredTasks.length)]

	res.status(200).json({
		task,
	});
};
module.exports = getRandomTranscriptionTask;
