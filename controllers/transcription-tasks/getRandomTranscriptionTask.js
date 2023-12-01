const { TranscriptionTask: Task } = require("../../models");
const { NotFound } = require("http-errors");
const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const getRandomTranscriptionTask = async (req, res, next) => {
	const { numberofsymbols } = req.query;

	const query = characters[Math.floor(Math.random() * characters.length)]
	const querySt = {
		eng: { $regex: `^${query}` },
		$and: [
			{ $expr: { $gt: [{ $strLenCP: '$eng' }, Number(numberofsymbols) - 1] } },
			{ $expr: { $lt: [{ $strLenCP: '$eng' }, Number(numberofsymbols) + 1] } }
		],
	}

	const tasks = await Task.find(querySt)
	if (!tasks.length) {
		throw new NotFound("No data");
	}

	const task = tasks[Math.floor(Math.random() * tasks.length)]

	res.status(200).json({
		task,
	});
};
module.exports = getRandomTranscriptionTask;
