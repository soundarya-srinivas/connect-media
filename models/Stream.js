const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
    Stream:
        {
           type:String,
          
        } 
        
},{
    timestamps: true
})
mongoose.model("Stream",StreamSchema)