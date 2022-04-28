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
	D: "Z",
	T: "X",
	Z: "q",
	G: "J",
};
const vaul = ["R", "L", "H", "x", "q", "e", "W", "J", "D", "T", "Z", "G"];

const getTrnToUtrnTransformer = async (req, res, next) => {
	
	const result = await Task.find()
	
	if (!result.length) {
		throw new NotFound("No data in database");
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
		const updatedElement = arr.join("")
		const _id=task._id
		const res = await Task.findByIdAndUpdate(
			_id,
			{ utrn: updatedElement},
			{ new: true }
		  );
		console.log(res)
		const updatedTask = { ...task._doc, utrn: arr.join("") };
		tasks.push(updatedTask);
	});

	res.status(200).json({
		responce:'proces initialized'
	});
};

module.exports = getTrnToUtrnTransformer;
