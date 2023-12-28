const { json } = require('body-parser');
const mongoose = require('mongoose');

const socialMediaAccountSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  username: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ucDavisId: { type: String, required: true, unique: true },
  fromDate: {type: Date, required: true},
  toDate: {type: Date, required: true},
  country: {type: String, required: true},
  region: {type: String, required: true},
  major: {type: String, required: true},
  degree: {type: String, required: true},
  gender: {type: String, required: true},
  smoker: {type: String, required: true},
  drinker: {type: String, required: true},
  lookingForRoommate: {type: String, required: true},
  foodPreference: {type: String, required: true},
  socialMediaAccounts: [socialMediaAccountSchema],
  aboutYou: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
