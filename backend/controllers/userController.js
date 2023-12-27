const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.details = async (req, res) => {
    try {

        const { email, toDate, fromDate, major, degree, country, region, foodPreference, gender, smoker, drinker} = req.query;
        
        // if (!email) {
        //     return res.status(400).send('Email is required');
        // }

        const query = {}

        if(email) query.email = email;
        if(toDate) query.toDate = toDate;
        if(fromDate) query.fromDate = fromDate;
        if(major) query.major = major;
        if(degree) query.degree = degree;
        if(country) query.country = country;
        if(region) query.region = region;
        if(foodPreference) query.foodPreference = foodPreference;
        if(gender) query.gender = gender;
        if(smoker) query.smoker = smoker;
        if(drinker) query.drinker = drinker;

        const user = await User.find(query);
        console.log(user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user)
        // res.json({ firstName: user.firstName, lastName: user.lastName, ucdavisId: user.ucdavisId,
        //            email: user.email, toDate: user.toDate, fromDate: user.fromDate, major: user.major,
        //            degree: user.degree, country: user.country, region: user.region, 
        //            foodPreference: user.foodPreference, smoker: user.smoker, drinker: user.drinker});
    } catch (error) {
        res.status(500).send('Server error');
    }
};
