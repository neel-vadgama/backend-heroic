const jwt = require('jwt-simple');
const userPersonal = require('../models/user.personal');
const userOrganization = require('../models/user.organization');
const User = require('../models/user.model');
const mongoose = require('mongoose');

const key = require('../config/key');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, key.secret);
}

// SignIn Controller function
exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

// SignUp Controller function
exports.signup = function(req, res, next) {

    // getting userType to define whether Account is Personal or Organization
    const { userType } = req.body;

    if(userType == "") {
      res.status(400).send({ message: "Please Enter User-Account Type!"})
    }

    // IF User Account type is *PERSONAL*
    if( userType === 'personal') {
      const { 
        FullName,
        Email,
        Password,
        ConfirmPassword
        } = req.body
        
        // Check if ANY Fields are Empty or Not
        if (!Email || !Password || !FullName || !ConfirmPassword) {
          return res.status(422).send({ message: 'Please Fill All the details Required!'});
        }
        // Password Length Validation
        if(Password.length < 8) {
          return res.status(422).send({ message: "Password must be atleast 8 Characters!"})
        }
        // Check if both Password does match
        if( Password !== ConfirmPassword ) {
          return res.status(422).send({ message: "Both password doesnt match."})
        }
        // Email type validation
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(mailformat.test(Email) != true) {
          return res.status(422).send({ message: "Enter valid Email Address!"});
        }

        // See if a user with the given email exists
        User.findOne({ Email: Email }, async (err, existingUser) => {
            
          if (err) { return next(err.message); }
        
          // If a user with email does exist, return an error
          if (existingUser) {
            return res.status(422).send({ error: 'Email Already Exists' });
          }
          
        // If a user with email does NOT exist, create and save user record In PERSONAL-ACCOUNT DB
        const newUserPersonal = new userPersonal({
          FullName,
          Email,
          Password
        });
            
        try {
          const newUserPer = await newUserPersonal.save()
          res.status(200).json({ token: tokenForUser(newUserPer), message: "New User-Personal Registered!" });
        }
        catch (err) {
          res.status(400).json({ message: err.message });
        }

        // SAVE User details in USER DATABASE
        const newuser = new User({
          userType,
          Email,
          Password
        })
        try {
          const user = await newuser.save();
          res.status(200).send({ message: "New user Registered as " + user.userType + " Account." });
        }
        catch (err) {
          res.status(400).json({ message: err.message });
        }
      });  
  } 


  /// SIGN UP FOR ORGANIZATION
  if( userType === 'organization' ) {
    const { 
      FullName,
      Email,
      Organization,
      OrganizationCode,
      Password,
      ConfirmPassword
    } = req.body
        
    // Check if Any Field is Empty or not           
    if (!Email || !Password || !FullName || !Organization || !OrganizationCode || !ConfirmPassword) {
      return res.status(422).send({ error: 'You must provide All the Details Required!'});
    }
    // Password Length Validation
    if(Password.length < 8) {
      return res.status(422).send({ message: "Password must be atleast 8 Characters!"})
    }
    // Check if both Password does match
    if( Password !== ConfirmPassword ) {
      return res.status(422).send({ message: "Both password doesnt match."})
    }
    // Email type validation
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mailformat.test(Email) != true) {
      return res.status(422).send({ message: "Enter valid Email Address!"});
    }

        
    // See if a user with the given email exists
    User.findOne({ Email: Email }, async (err, existingUser) => {
            
      if (err) { return next(err.message); }
        
      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email Already Exists' });
      }
      // If a user with email does NOT exist, create and save user record
      const newUserOrg = new userOrganization({
        FullName,
        Email,
        Organization,
        OrganizationCode,
        Password
      });
          
      try {
        const newUser = await newUserOrg.save()
        res.status(200).json({ token: tokenForUser(newUser), message: "New User-Org Registered!" });
      }
      catch (err) {
        res.status(400).json({ message: err.message });
      }
    
      // Store User details in USER DATABASE
      const newUser = new User({
        userType,
        Email,
        Password
      })
      try {
        const newuser = await newUser.save();
        res.status(200).send({ message: "New user Registered in " + newuser.userType });
      }
      catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
  }   
}


// Get USER Details from ID Field 
exports.getUserById =  (req, res, next) => {
  User.findOne({_id: req.params.id }, function (err, user) { 
  if(err) { 
    return res.json({ message: err.message }); 
  } 
  else {
    const user_type = user.userType;
    const user_email = user.Email;
    if( user_type == 'personal') {
      userPersonal.findOne({ Email: user_email }, function(err, user) {
      if(err) {
        return res.json({ message: err.message });
      }
      else {
        return res.json({ user });
      }
      });
    }
    if( user_type == 'organization') {
      userOrganization.findOne({ Email: user_email }, function(err, user) {
        if(err) {
          return res.json({ message: err.message });
        }
        else {
          return res.json({ user });
        }
        });
    }
  }
  }); 
}