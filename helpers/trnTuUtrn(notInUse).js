const { TranscriptionTask: Task } = require("../../models");
const { NotFound } = require("http-errors");

const Vaul = {
	R: "A",
	L: "O",
	H: "U",
	x: "Q",
	q: "e",
	e: "E",
	W: "Y",
	J: "y",
	I: "j",
	D: "Z",
	T: "X",
	Z: "q",
	G: "J",
};
const vaul = ["R", "L", "H", "x", "q", "e", "W", "J", "I", "D", "T", "Z", "G"];

const getAllUTranscriptionTasksByQuery = async (req, res, next) => {
	const { page = 1, limit = 20, query = "" } = req.query;
	const skip = (page - 1) * limit;
	const querySt = { eng: { $regex: `.*${query}.*` } };
	const result = await Task.find()
	
	if (!result.length) {
		throw new NotFound("No data by your query");
	}
	const tasks = [];
	result.map(async (task) => {
		const arr = [];
		task["trn"].split("").map((e) => {
			if (e === "[" || e === "]") return;
			if (vaul.includes(e)) {
				arr.push(Vaul[e]);
			} else {
				arr.push(e);
			}
		});
		const apdEl = arr.join("")
		const _id=task._id
		const res = await Task.findByIdAndUpdate(
			_id,
			{ utrn: apdEl},
			{ new: true }
		  );
		console.log(res)
		const apdatedTask = { ...task._doc, utrn: arr.join("") };
		delete apdatedTask.trn;
		tasks.push(apdatedTask);
	});


	res.status(200).json({
		tasks,
	});
};

module.exports = getAllUTranscriptionTasksByQuery;
