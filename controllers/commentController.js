const asyncHandler = require('express-async-handler')
const Comment = require("../models/commentModel")

// @desc create a schedule
// @route POST /api/schedules/
// @access private
const createComment = asyncHandler(
    async (req,res) => {


        const user_id = req.user.id

        const {comment} = req.body
        console.log(req.body)
        // if(!from || !to || !subject || !body || !time){

        //     res.status(400)
        //     throw new Error("All fields are mandatory!")

        // }

        const comments = await Comment.create(
            {
                user_id,
                comment,
            }
            
        )

        res.status(201).json({'msg' : "Comment Successfully Sent"})

    }
)

module.exports = {createComment}