const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.details = async (req, res) => {
    try {

        const { email } = req.query;
        
        // if (!email) {
        //     return res.status(400).send('Email is required');
        // }

        const user = await User.findOne({ email: email }).select('firstName lastName email ucdavisId');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ firstName: user.firstName, lastName: user.lastName, ucdavisId: user.ucdavisId, email: user.email });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
