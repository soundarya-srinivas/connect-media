const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types;

const UserInterestSchema = new mongoose.Schema({
   technologyId:[
      {
         type:ObjectId,
         ref:"Technology",
         required:[true,"tech id is mandatory"]
      } 
   ],
   
     userInterestOfUser:[
      {
         type:ObjectId,
         ref:"Technology",
         required:true
      } 
   ]
},{
   timestamps: true
})
mongoose.model("UserInterest",UserInterestSchema)