const { TranscriptionTask: Task } = require("../../models");
const { NotFound } = require("http-errors");

const getRandomTranscriptionTask = async (req, res, next) => {
	const { numberofsymbols } = req.query;

	const querySt = {
		eng: { $exists: true },
		$and: [
			{ $expr: { $gt: [{ $strLenCP: '$eng' }, Number(numberofsymbols)- 1] } },
			{ $expr: { $lt: [{ $strLenCP: '$eng' }, Number(numberofsymbols) + 1] } }
		],
	}

	const tasks = await Task.find(querySt)
	// .limit(2000)
	if (!tasks.length) {
		throw new NotFound("No data by your query");
	}

	const task = tasks[Math.floor(Math.random() * tasks.length)]
	
	res.status(200).json({
		task,
	});
};
module.exports = getRandomTranscriptionTask;
