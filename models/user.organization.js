
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Model for the User-Organization Register
const userOrganizationSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Organization: {
        type: String,
        required: true
    },
    OrganizationCode: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        min: 8
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})


// Encrypt password using bcrypt lib
userOrganizationSchema.pre('save',function(next){

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

//comparepassword
userOrganizationSchema.methods.comparePassword = function (ConfirmPassword, callback) {
    bcrypt.compare (String (ConfirmPassword), String (this.Password), function (err,isMatch) {
      if (err) {
        return callback (err);
      }
      callback (null, isMatch);
    });
 };

//Export the model
module.exports = mongoose.model("Organization-Account", userOrganizationSchema);


