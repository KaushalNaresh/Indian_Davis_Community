const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const { email, password, ucDavisId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword, ucDavisId: ucDavisId });
    const exists = await User.findOne({$or:[{email: email}, {ucDavisId: ucDavisId}]});
    
    if(exists) throw new Error("User already Exists");
    await user.save();
    res.status(201).json({ message: 'User created!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.login = async (req, res) => {
    const { email, password, ucDavisId } = req.body;
    const exists = User.findOne({email});
      if(exists){
        
      }
      else{
        res.status(500).json({ message: "Login failed, user doesn't exist" });
      }
  };
