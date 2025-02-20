// models/User.js

const mongoose = require('mongoose');

const socialMediaAccountSchema = new mongoose.Schema({
  platform: { type: String },  
  username: { type: String }   
});

const userSchema = new mongoose.Schema({
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  ucDavisId:    { type: String, required: true, unique: true },
  fromDate:           { type: Date },
  toDate:             { type: Date },
  country:            { type: String },
  region:             { type: String },
  major:              { type: String },
  degree:             { type: String },
  gender:             { type: String },
  smoker:             { type: String },
  drinker:            { type: String },
  lookingForRoommate: { type: String },
  foodPreference:     { type: String },
  socialMediaAccounts: [socialMediaAccountSchema],
  aboutYou:           { type: String }
});

module.exports = mongoose.model('User', userSchema);
