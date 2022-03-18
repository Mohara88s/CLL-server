const { Task } = require('../models')
// const { NotFound, BadRequest } = require('http-errors')

const getAllTasks = async (req, res, next) => {
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

// const getTaskById = async (req, res, next) => {
//   const { taskId } = req.params
//   const result = await Task.findById(taskId, '_id name email phone favorite')
//   if (!result) {
//     throw new NotFound(`Task with id=${taskId} not found`)
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result,
//     },
//   })
// }

// const addTask = async (req, res, next) => {
//   const { _id } = req.user
//   const newTask = { ...req.body}
//   const result = await Task.create(newTask)
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result,
//     },
//   })
// }

// const removeTaskById = async (req, res, next) => {
//   const { taskId } = req.params
//   const result = await Task.findByIdAndDelete(taskId)
//   if (!result) {
//     throw new NotFound(`Task with id=${taskId} not found`)
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     message: 'task deleted',
//     data: {
//       result,
//     },
//   })
// }

// const updateTaskById = async (req, res, next) => {
//   const { taskId } = req.params
//   const result = await Task.findByIdAndUpdate(taskId, req.body, { new: true })

//   if (!result) {
//     throw new NotFound(`Task with id=${taskId} not found`)
//   }
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result,
//     },
//   })
// }



module.exports = {
  getAllTasks,
  // getTaskById,
  // addTask,
  // removeTaskById,
  // updateTaskById,
}
