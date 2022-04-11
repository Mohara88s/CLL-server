const { QTranscriptionTask:Task } = require('../../models')

const getAllQTranscriptionTasksByQuery = async (req, res, next) => {
  const { page = 1, limit = 20, query = ''} = req.query
  const skip = (page - 1) * limit
  const querySt = {eng: {'$regex': `.*${query}.*`}}
  const result = await Task.find(querySt).skip(skip).limit(+limit)

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getAllQTranscriptionTasksByQuery
