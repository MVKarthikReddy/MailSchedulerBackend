const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        comment : {
            type: String,
            required: [true, "Please add the comment address"]
        },
        
    },
    {
        timestamp: true
    }
    
)

module.exports = mongoose.model("Comment",commentSchema)