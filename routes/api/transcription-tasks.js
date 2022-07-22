const express = require('express')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { transcriptionTasks: ctrl } = require('../../controllers')

const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   TranscriptionTask:
 *    type: object
 *    requaired:
 *     - eng
 *     - phtrn
 *     - utrn
 *     - qtrn
 *     - rus
 *    properties:
 *     _id:
 *         type: string
 *         description: the auto generated id of the task
 *     eng:
 *         type: string
 *         description: English version of task
 *     phtrn:
 *         type: string
 *         description: ph-transcription version of task
 *     utrn:
 *         type: string
 *         description: u-transcription version of task
 *     qtrn:
 *         type: string
 *         description: q-transcription version of task
 *     rus:
 *         type: string
 *         description: Russian version of task
 *    example: 
 *     _id: 6278cbbe274f3c3d65595677
 *     eng: azure
 *     phtrn: "['xZq]"
 *     utrn: Qqe
 *     qtrn: aiqe
 *     rus: лазурь
 */

/**
 * @swagger
 * tags:
 *  name: TranscriptionTasks
 * description: the transcription tasks API
 */

/**
 * @swagger
 * /api/transcription-tasks:
 *  get:
 *   summary: returns the list of the tasks
 *   tags: [TranscriptionTasks]
 *   parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        required: false
 *        description: the page number of result set
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 20
 *        required: false
 *        description: the number of items in result set
 *      - in: query
 *        name: query
 *        schema:
 *          type: string
 *        required: false
 *        description: query for filter      
 *   responses:
 *     200:
 *       description: the list of tasks
 *       content:
 *        application/json:
 *          schema:
 *           type: array
 *           tasks:
 *              $ref: '#/components/schemas/TranscriptionTask'
 */
router.get('/', controllerWrapper(ctrl.getAllTranscriptionTasksByQuery))



// router.get('/trn-to-utrn', controllerWrapper(ctrl.getTrnToUtrnTransformer))


// router.get('/:taskId', authenticate, controllerWrapper(ctrl.getTaskById))

// router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addTask))

// router.delete('/:taskId', authenticate, controllerWrapper(ctrl.removeTaskById))

// router.put('/:taskId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateTaskById))

module.exports = router
