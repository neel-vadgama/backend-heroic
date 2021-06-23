
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Model for the User (both Org's & Personal Account)
const userSchema = new Schema({
    userType: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})


// Encrypt Password using bcrypt 
userSchema.pre('save',function(next){

    const user = this;

    //generate a salt
    bcrypt.genSalt(10, function(err,salt){
        if(err){
            return(err);
        }

        //hash(encypt) password using the salt
        bcrypt.hash(user.Password,salt,null,function(err, hash){
            if (err){
                return next(err);
            }
            //overwrite plain text password with encrypted password 
            user.Password = hash;
            next();
        });
    });
});

//Export the model
module.exports = mongoose.model("user", userSchema);


