const { TranscriptionTask: Task } = require("../../models");
const { BadRequest } = require("http-errors");

const transcriptionTypes = ['U-transcription', 'Q-transcription'];

const transcriptText = async (req, res) => {
	const { englishText, transcriptionType } = req.body;
	if (!englishText) {
		throw new BadRequest("Text is required");
	}
	if (!transcriptionType) { 
		throw new BadRequest("Transcription type is required");
	}
		const transcriptionAdres = {};
	switch (transcriptionType) {
		case transcriptionTypes[0]:
			transcriptionAdres.adres = 'utrn'
			break;
		case transcriptionTypes[1]:
			transcriptionAdres.adres = 'qtrn'
			break;
		default:
			throw new BadRequest("Transcription type not found");
	  }
	const textArray = englishText.match(/\b(\w+)\b/g)

	const transcriptedTextArray =
		await Promise.all(textArray.map(async (e) => {
			const query = {
				$or: [
					{ eng: e },
					{ eng: e.toLowerCase() },
				]
			}
			const task = await Task.find(query)
			
			if (task.length === 0) { return '#' + e } else { return task[0][transcriptionAdres.adres].split(',')[0] }
		}))

	const text = transcriptedTextArray.join(" ")

	res.status(200).json({
		text,
	});
};

module.exports = transcriptText;
