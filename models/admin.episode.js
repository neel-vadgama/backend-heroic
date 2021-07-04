
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const EpisodeSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Episode_Topic: {
        topic_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        topic_name: {
            type: String,
            required: true
        }
    },
    Theme1: {
        theme1_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        theme1_name: {
            type: String,
            required: true
        }
    },
    Theme2: {
        theme2_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        theme2_name: {
            type: String,
            required: true
        }
    },
    Theme3: {
        theme3_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        theme3_name: {
            type: String,
            required: true
        }
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


