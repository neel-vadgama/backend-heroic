
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model for the Podcast Types
const ThemeSchema = new Schema({
    theme: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

//Export the model
module.exports = mongoose.model("Theme", ThemeSchema);


