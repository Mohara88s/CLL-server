const { TranscriptionTask: Task } = require("../../models");

const getAllQTranscriptionTasksByQuery = async (req, res, next) => {
  const { page = 1, limit = 20, query = "" } = req.query;
  const skip = (page - 1) * limit;
  const querySt = { eng: { $regex: `.*${query}.*` } };
  const tasks = await Task.find(querySt, '_id eng rus qtrn')
    .skip(skip)
    .limit(+limit);
  res.status(200).json({
      tasks,
  });
};

module.exports = getAllQTranscriptionTasksByQuery;
