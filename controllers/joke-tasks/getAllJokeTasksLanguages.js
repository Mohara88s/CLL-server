const { Language } = require("../../models");
const { NotFound } = require("http-errors");

const getAllJokeTasksLanguages = async (req, res, next) => {
    const languagesArray = await Language.find()
        .sort({ "language_name": 1 })
    if (!languagesArray.length) {
        throw new NotFound("No languages found");
    }
    // const languages = languagesArray.map(language => language.language_name)

    res.status(200).json({
        languages:languagesArray,
    });
};

module.exports = getAllJokeTasksLanguages;
