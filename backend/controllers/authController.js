const bcrypt = require('bcryptjs');
const User = require('../models/user');

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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Authentication failed. Incorrect Email or Password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ message: 'Authentication failed. Incorrect Email or Password.' });
        
        res.status(201).json({ message: 'User Exists!'});
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
 };
