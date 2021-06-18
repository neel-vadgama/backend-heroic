
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const EpisodeSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
        required: true
    },
    Theme1: {
        type: String,
        required: true
    },
    Theme2: {
        type: String,
        required: true
    },
    Theme3: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    AudioFile: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

//Export the model
module.exports = mongoose.model("Episode", EpisodeSchema);


