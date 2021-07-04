const jwt = require('jwt-simple');
const Admin = require('../models/admin.models');
const Theme = require('../models/admin.theme');
const Topic = require('../models/admin.topic');
const Episode = require('../models/admin.episode');
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
  const{ 
    email,
    password,
    username,
    phone,
  } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  Admin.findOne({ email: email }, async (err, existingAdmin) => {
    
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingAdmin) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    // If a user with email does NOT exist, create and save user record
    const admin = new Admin({
      email: email,
      password: password,
      username: username,
      phone: phone,
    });

    try{
    const newAdmin = await admin.save()
      res.status(200).json({ token: tokenForUser(newAdmin) });
    }
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
}

/*
  ADMIN_CONTROLLERS
  -> TOPIC
  -> THEME
  -> EPISODE

*/


/// TOPIC GET API -> Get the Topic's List from DB in JSON format ///

exports.getTopic = async (req, res, next) => {
  try {
    const topic = await Topic.find();
    if(topic) {
      res.json(topic);
    }
    else res.json({ message: 'No Topics available currently'})

  } catch(err) {
    res.json({ message: err.message });
  }
  res.json({ success: "true", message: "GET Request for ADMIN_TOPIC"});
}


/// TOPIC POST API -> POST the Topic's List to DB in JSON ///

exports.postTopic = async (req, res, next) => {
  const topic = new Topic({
    title: req.body.title,
    image: req.body.image,
    summary: req.body.summary,  
  });
  try {
      const newTopic = await topic.save();
      res.json(newTopic);

    } catch(err) {
    res.json({ message: err.message, status: "error" });
  }
}


/// THEME GET API -> Get the THEME's from DB in JSON ///

exports.getTheme = async (req, res, next) => {
  try {
    const themes = await Theme.find();
    if(themes) {
      res.json({ themes });
    }
    else res.json({ message: 'No Themes available'})

  } catch(err) {
    res.json({ message: err.message });
  }
  res.json({ success: "true", message: "GET ADMIN_THEMES"});
}


/// THEME POST API -> POST the THEME's to DB  ///

exports.postTheme = async (req, res, next) => {
  const theme = new Theme({
    theme: req.body.theme,  
  });
  try {
    const findTheme = await Theme.find();
    if(findTheme.theme === theme) {
      res.json({ message: 'This theme already exists'});
    }
    else {
      const newTheme = await theme.save();
      res.json(newTheme);
    }
  } catch(err) {
    res.json({ message: err.message, status: "error" });
  }
}


/// EPISODE GET API -> Get the EPISODE's List from DB in JSON ///

exports.getEpisode = async (req, res, next) => {
  try {
    const episodes = await Episode.find();
    if(episodes) {
      res.json(episodes);
    }
    else res.json({ message: 'No Episodes available currently'})

  } catch(err) {
    res.json({ message: err.message });
  }
  res.json({ success: "true", message: "GET Request for ADMIN_EPISODE"});
}


/// EPISODE POST API -> POST the EPISODE's List to DB  ///

exports.postEpisode = async (req, res, next) => {
  const episode = new Episode({
    Title: req.body.Title,
    Topic: req.body.Topic,
    Theme1: req.body.Theme1,
    Theme2: req.body.Theme2,
    Theme3: req.body.Theme3,
    Image: req.body.Image,
    AudioFile: req.body.AudioFile,
    Description: req.body.Description,  
  });
  try {
      const newEpisode = await episode.save();
      res.json(newEpisode);

    } catch(err) {
    res.json({ message: err.message, status: "error" });
  }
}


/// TOPIC-TITLE GET API -> Get the Topic's TITLE List from DB in JSON  ///

exports.getTopicTitle = async (req, res, next) => {
  try {
    const topicTitle = await Topic.find({}, {_id: 0, "title": 1});
    res.json({ topicTitle });
 
  } catch(err) {
    res.json({ message: err.message });
  }
}


/// ORGANIZATION POST API -> POST the Org's List to DB  ///

exports.postOrganization = async (req, res, next) => {
  const org = new Org({
    OrganizationName: req.body.OrganizationName,
    OrganizationCode: req.body.OrganizationCode,
  });
  try {
      const checkOrgName = await Org.findOne({ OrganizationName: req.body.OrganizationName });
      if(checkOrgName) {
        res.json({ message: 'Please Try Different Org name, Its already Exists!'});
      }
      else {
        const newOrg = await org.save();
        res.json(newOrg);  
      }
    } catch(err) {
    res.json({ message: err.message, status: "error" });
  }
}


/// ORGANIZATION GET API -> Get the Org's List from DB in JSON  ///

exports.getOrganization = async (req, res, next) => {
  try {
    const OrgList = await Org.find({}, { _id: 0 });
    res.json({ OrgList });
 
  } catch(err) {
    res.json({ message: err.message });
  }
}


/// ORGANIZATION GET BY ID API -> Get the Particular Org by ID from DB in JSON  ///
 
exports.getOrgById =  (req, res, next) => {
  Org.findOne({_id: req.params.id }, function (err, org) { 
  if(err) { 
    return res.json({ message: err.message }); 
  } 
  else {
      return res.json({ org });
    }
  }); 
}
