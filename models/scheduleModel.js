const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        from : {
            type: String,
            required: [true, "Please add the from address"]
        },
        to : {
            type: String,
            required: [true, "Please add the to address"],
        },
        cc : {
            type: String,
            // required: [true, "Please add the user password"]
        },
        bcc : {
            type: String,
            // required: [true, "Please add the user password"]
        },
        subject : {
            type: String,
            required: [true, "Please add the subject of the email"]
        },
        body : {
            type: String,
            required: [true, "Please add the body of the email"]
        },
        date : {
            type: String,
            required: [true, "Please add the schedule date of the email"]
        },
        time : {
            type: String,
            required: [true, "Please add the schedule time of the email"]
        },
    },
    {
        timestamp: true
    }
    
)

module.exports = mongoose.model("Schedule",scheduleSchema)