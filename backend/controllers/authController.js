const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, ucDavisId,
          fromDate, toDate, country, region, major, degree, gender, smoker, drinker,
          lookingForRoommate, foodPreference, socialMediaAccounts, aboutYou } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword, 
                            ucDavisId: ucDavisId, fromDate: fromDate, toDate: toDate, country: country, 
                            region: region, major: major, degree: degree, gender: gender, smoker: smoker, drinker: drinker,
                            lookingForRoommate: lookingForRoommate, foodPreference: foodPreference, 
                            socialMediaAccounts: socialMediaAccounts, aboutYou: aboutYou});
    const exists = await User.findOne({$or:[{email: email}, {ucDavisId: ucDavisId}]});
    
    if(exists) throw new Error("User already Exists \n Login to your account");
    await user.save();
    res.status(201).json({ message: 'User created!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.verifyToken = (req, res) => {
  try {
      // Assuming your token is stored in a cookie named 'token'
      const token = req.cookies.token;

      if (!token) {
          return res.status(401).json({ message: 'No token provided' });
      }

      // Verifying the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      res.json(decoded);

      // next(); // Proceed to the next middleware/function
  } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

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
        // console.log(process.env.JWT_SECRET);
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Replace with a secret key of your choice
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.status(201).json({ message: 'User Exists!'});
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
 };


 exports.logout = async (req, res) => {

  res.clearCookie('token'); // The name of the cookie you want to clear
  res.status(200).json({ message: 'Logged out successfully' });
  
};
