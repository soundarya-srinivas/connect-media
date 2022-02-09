const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types;

const QuestionSchema = new mongoose.Schema({
    Question:
    {
        type: String,
        required: [true, "Please post your Question"]

    },
    Answers: [{
        text:{},
        
        postedby: {
            type: ObjectId,
            ref: "User"
        },

        verified: Boolean,
        AnswerImage: {
            type: String,
           
            required: false
        },
        likes: [
            {
                type: ObjectId,
                ref: "User"
            }
        ],
        unlikes: [
            {
                type: ObjectId,
                ref: "User"
            }
        ],
      
        streamid:{
            type: ObjectId,
            ref: "Stream"
    
    
        },
        technologyid:{
            type: ObjectId,
            ref: "Technology"
    
    
        },
       
    },{ timestamps: true}],





    QuestionImage: {
        type: String,
        
        required: false
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    unlikes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    postedby: {
        type: ObjectId,
        ref: "User"


    },
    streamid:{
        type: ObjectId,
        ref: "Stream"


    },
    technologyid:{
        type: ObjectId,
        ref: "Technology"


    },
   



},{
    timestamps: true
}
)
mongoose.model("Question", QuestionSchema)