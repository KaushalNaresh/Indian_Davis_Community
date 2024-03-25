const bcrypt = require('bcryptjs');
const User = require('../models/user');
const stringConstants = require("../StringConstants.json")

exports.details = async (req, res) => {
    try {
        // console.log(req.query)
        const {toDate, fromDate, major, degree, country, region, foodPreference, gender, smoker, drinker} = req.body;
        const {email, prevPageNumber, currPageId, currPageNumber} = req.query;
        const logged_user = req.user.email;

        const query = {};
        let users = {};
        let totalPages = 0;

        if(email) query.email = email;
        if(toDate) query.toDate = {$lte: new Date(toDate)};
        if(fromDate) query.fromDate = {$gte: new Date(fromDate)};
        if(major && major != "2") query.major = major;
        if(degree && degree != "2") query.degree = degree;
        if(country) query.country = country;
        if(country && region) query.region = region;
        if(foodPreference && foodPreference != "2") query.foodPreference = foodPreference; 
        if(gender && gender != "2") query.gender = gender;
        if(smoker && smoker != "2") query.smoker = smoker;
        if(drinker && drinker != "2") query.drinker = drinker;

        const totalItems = await User.countDocuments({
            'email': { $ne: logged_user },
            ...query
        });
        totalPages = Math.ceil(totalItems / stringConstants['roommates']);

        let queryObj = {
            'email': { $ne: logged_user },
            ...query
        };

        if (prevPageNumber != -1 && currPageNumber < prevPageNumber) {
            queryObj['_id'] = { $lt: currPageId };

            users = await User.find(queryObj)
                  .sort({'_id': -1})
                  .skip((prevPageNumber-currPageNumber-1)*stringConstants['roommates'])
                  .limit(stringConstants['roommates']);

            users = users.reverse();

        }
        else if (prevPageNumber != -1 && currPageNumber > prevPageNumber) {
            queryObj['_id'] = { $gte: currPageId };
            users = await User.find(queryObj)
                  .sort({'_id': 1})
                  .skip(((currPageNumber-prevPageNumber)*stringConstants['roommates']))
                  .limit(stringConstants['roommates']);
        }
        else{
            users = await User.find(queryObj)
                  .sort({'_id': 1})
                  .limit(stringConstants['roommates']);
        }

        if (users.length == 0) {
            return res.json({message: "No user(s) found"});
        }

        res.json({
                    message: 'OK',
                    users: users,
                    totalPages: totalPages,
                    currPageId: users[0]["_id"]
        })

        } catch (error) {
            res.status(404).send({message: error.message});
    }
};

exports.updateDetails = async (req, res) => {
    try{
        const updatedUserBody = req.body;
        const email = updatedUserBody.email;

        const user = await User.findOneAndUpdate({'email': email}, updatedUserBody, {new: true});
        if(!user){
            res.status(404).send({message: 'User not found'});
        }

        res.status(200).send({ message: 'User updated successfully', user });
    }
    catch(e){
        res.status(500).send({ message: 'Error updating user' });
    }
};
