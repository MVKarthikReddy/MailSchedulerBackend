const express = require('express')
const validationToken = require('../middleware/validationToken')
const { scheduleMail,updateSchedule,deleteSchedule,getSchedules } = require('../controllers/scheduleController')
const { createComment } = require('../controllers/commentController')

const router = express.Router()

router.use(validationToken)

router.route("/schedules/").post(scheduleMail).get(getSchedules)
router.route("/schedule/:id").put(updateSchedule).delete(deleteSchedule)
router.route("/comments/").post(createComment)


module.exports = router
