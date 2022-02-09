const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types;

const FeedbackSchema = new mongoose.Schema({
    feedback:
    {
        type: String,
        required: [true,"please give us feedback"]

    },
    postedby: [{
        type: ObjectId,
        ref: "User"
    }],
    rating:{
        type:Number,
        required:[true,"please provide rating"]
    }

},{
    timestamps: true
})
mongoose.model("Feedback", FeedbackSchema)