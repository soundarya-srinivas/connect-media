const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const TechnologySchema = new mongoose.Schema({
    streamid: [{
        type: ObjectId,
        ref: "Stream"

    }],
    Technology:
    {
        type: String,
        unique:true

    }

}, {
    timestamps: true
})
mongoose.model("Technology", TechnologySchema)