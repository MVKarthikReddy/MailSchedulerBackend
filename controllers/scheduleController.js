const asyncHandler = require('express-async-handler')
const Schedule = require("../models/scheduleModel")

// @desc create a schedule
// @route POST /api/schedules/
// @access private
const scheduleMail = asyncHandler(
    async (req,res) => {

        console.log(req.headers)

        const user_id = req.user.id
     

        const {from,to,cc,bcc,subject,body,date,time} = req.body
        // console.log(req.body)
        // if(!from || !to || !subject || !body || !time){

        //     res.status(400)
        //     throw new Error("All fields are mandatory!")

        // }

        const schedule = await Schedule.create(
            {
                user_id,
                from,
                to,
                cc,
                bcc,
                subject,
                body,
                date,
                time,
            }
            
        )

        res.status(201).json({'msg' : "Schedule successfully created"})

    }
)

// @desc update a schedule
// @route PUT /api/schedule/:id
// @access private
const updateSchedule = asyncHandler(async(req,res) => {

    const schedule = await Schedule.findById(req.params.id)
    if(!schedule)
    {
        res.status(404)
        throw new Error("Schedule not found")
    }

    if(schedule.user_id.toString() !== req.user.id)
    {
        res.status(403)
        throw new Error("User don't have a permission to update the contact")
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedSchedule)
})


// @desc delete a schedule
// @route DELETE /api/schedule/:id
// @access private
const deleteSchedule = asyncHandler(async (req,res) => {

    const schedule = await Schedule.findById(req.params.id)
    if(!schedule)
    {
        res.status(404)
        throw new Error("Schedule not found")
    }
    if(schedule.user_id.toString() !== req.user.id)
    {
        res.status(403)
        throw new Error("User don't have a permission to delete the schedule")
    }
    await Schedule.findByIdAndDelete(
        req.params.id,
        req.body,
        { new:true }
    )
    res.status(200).json(schedule)
})

// @desc get all contacts
// @route GET /api/contacts/
// @access private
const getSchedules = asyncHandler(async(req,res) => {

    const schedules = await Schedule.find({user_id: req.user.id})
    res.status(200).json({
        schedules
    })

})

module.exports = {
    scheduleMail,
    updateSchedule,
    deleteSchedule,
    getSchedules
}