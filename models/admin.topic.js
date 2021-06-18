
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

//Export the model
module.exports = mongoose.model("Topic", TopicSchema);


