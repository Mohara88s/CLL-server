const { QTranscriptionTask:Task } = require('../../models')

const getAllQTranscriptionTasks = async (req, res, next) => {
  const { page = 1, limit = 20} = req.query
  const skip = (page - 1) * limit
  const result = await Task.find().skip(skip).limit(+limit)

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getAllQTranscriptionTasks
