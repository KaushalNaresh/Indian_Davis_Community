const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    ucDavisId,
    fromDate,
    toDate,
    country,
    region,
    major,
    degree,
    gender,
    smoker,
    drinker,
    lookingForRoommate,
    foodPreference,
    socialMediaAccounts,
    aboutYou
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const exists = await User.findOne({
      $or: [{ email: email }, { ucDavisId: ucDavisId }]
    });
    if (exists) {
      throw new Error('User already exists. Please log in to your account.');
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      ucDavisId,
      // Optional fields (if present, great; if not, they'll remain undefined)
      fromDate,
      toDate,
      country,
      region,
      major,
      degree,
      gender,
      smoker,
      drinker,
      lookingForRoommate,
      foodPreference,
      socialMediaAccounts,
      aboutYou
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Replace with your secret key
      { expiresIn: '1h' }
    );

    // Set token as an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 3600 * 1000
    });

    res.status(201).json({ message: 'User created!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyToken = (req, res) => {

      res.set('Cache-Control', 'no-store');

      const userData = req.user;
      res.json(userData);

};

exports.authUserDetails = async (req, res) => {

  try{

    res.set('Cache-Control', 'no-store');

    const logged_user_email = req.user.email;
    const token = req.token;

    const queryObj = {'email': logged_user_email};
    const user = await User.find(queryObj);

    if (user.length == 0) {
      return res.json({message: "No user(s) found"});
    }

    res.json({
      message: 'OK',
      user: user,
      token: token
    });

  }
  catch(error){
    res.status(404).send({message: error.message});
  }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Authentication failed. Incorrect Email or Password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ message: 'Authentication failed. Incorrect Email or Password.' });
        
        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Replace with a secret key of your choice
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600 * 1000});

        res.status(200).json({ message: 'User Exists!'});
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
 };


 exports.logout = async (req, res) => {

  res.clearCookie('token'); // The name of the cookie you want to clear
  res.status(200).json({ message: 'Logged out successfully' });
  
};
