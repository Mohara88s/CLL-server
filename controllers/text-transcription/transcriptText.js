const { TranscriptionTask: Task } = require("../../models");
const { BadRequest } = require("http-errors");
const { createIntlSegmenterPolyfill } = require('intl-segmenter-polyfill')
const fs = require('fs')
const wasmBuffer = fs.readFileSync('node_modules/intl-segmenter-polyfill/dist/break_iterator.wasm')
let wasmBinary = new Uint8Array(wasmBuffer)
const transcriptionTypes = ['U-transcription'];

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
		default:
			throw new BadRequest("Transcription type not found");
	}
	// const textArray = englishText
	// .match(/\b(\w+)\b/g)
	// .match(/[\p{L}\p{N}\p{S}\p{M}]+/gu)

	const Segmenter = await createIntlSegmenterPolyfill(wasmBinary);
	const segmenter = new Segmenter("en", { granularity: 'word' });
	const textArray = segmenter.segment(englishText);

	const transcriptedTextArray =
		await Promise.all(textArray.map(async (e) => {
			if (e.isWordLike) {
				const query = {
					$or: [
						{ eng: e.segment },
						{ eng: e.segment.toLowerCase() },
					]
				}
				const task = await Task.find(query)

				if (task.length === 0) { return { ...e, segment: '#' + e.segment } } else { return { ...e, segment: task[0][transcriptionAdres.adres].split(',')[0] } }
			} else return e
		}))
	const text = transcriptedTextArray.map(e => { return e.segment }).join('')

	res.status(200).json({
		text,
	});
};

module.exports = transcriptText;
