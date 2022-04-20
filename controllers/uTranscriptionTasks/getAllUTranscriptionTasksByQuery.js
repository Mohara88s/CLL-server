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
	const result = await Task.find(querySt, "_id eng rus trn")
		.skip(skip)
		.limit(+limit);
	if (!result.length) {
		throw new NotFound("No data by your query");
	}
	const tasks = [];
	result.map((obj) => {
		const arr = [];
		obj["trn"].split("").map((e) => {
			if (e === "[" || e === "]") return;
			if (vaul.includes(e)) {
				arr.push(Vaul[e]);
			} else {
				arr.push(e);
			}
		});
		const some = { ...obj._doc, utrn: arr.join("") };
		delete some.trn;
		tasks.push(some);
	});

	res.status(200).json({
		tasks,
	});
};

module.exports = getAllUTranscriptionTasksByQuery;
