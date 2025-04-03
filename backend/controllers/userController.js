const bcrypt = require('bcryptjs');
const User = require('../models/user');
const stringConstants = require("../StringConstants.json")
const { sortByMatchScore } = require('../services/scoringService');

const details = async (req, res) => {
    try {
        const {toDate, fromDate, major, degree, country, region, foodPreference, gender, smoker, drinker} = req.body;
        const {email, prevPageNumber, currPageId, currPageNumber} = req.query;
        const logged_user = req.user.email;

        const query = {};
        let users = {};
        let totalPages = 0;

        // Add lookingForRoommate filter
        query.lookingForRoommate = "1";

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
        else {
            users = await User.find(queryObj)
                  .sort({'_id': 1})
                  .limit(stringConstants['roommates']);
        }

        if (users.length == 0) {
            return res.json({message: "No user(s) found"});
        }

        // Get current user for scoring
        const currentUser = await User.findOne({ email: logged_user });
        
        // Sort users by match score
        const sortedUsers = sortByMatchScore(currentUser, users);

        res.json({
            message: 'OK',
            users: sortedUsers,
            totalPages: totalPages,
            currPageId: sortedUsers[0]["_id"]
        });

    } catch (error) {
        res.status(404).send({message: error.message});
    }
};

const updateDetails = async (req, res) => {
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

const getTopMatches = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        const currentUser = await User.findById(currentUserId);
        const limit = req.query.limit ? parseInt(req.query.limit) : null;

        // Find users who are looking for roommates, excluding the current user
        const query = {
            _id: { $ne: currentUserId },
            lookingForRoommate: "1"
        };

        // If limit is provided, use it in the query
        const potentialRoommates = await User.find(query)
            .select('firstName lastName email major degree country region smoker drinker foodPreference socialMediaAccounts aboutYou')
            .limit(limit || 0); // If no limit, fetch all (0 means no limit in MongoDB)

        // Sort by match score
        const sortedRoommates = sortByMatchScore(currentUser, potentialRoommates);

        // Transform the data to match frontend expectations
        const transformedRoommates = sortedRoommates.map(roommate => {
            // Handle both Mongoose document and plain object cases
            const roommateData = roommate._doc || roommate;
            return {
                _id: roommateData._id,
                firstName: roommateData.firstName,
                lastName: roommateData.lastName,
                email: roommateData.email,
                major: roommateData.major,
                degree: roommateData.degree,
                country: roommateData.country,
                state: roommateData.region,
                smoker: roommateData.smoker,
                food: roommateData.foodPreference,
                drinker: roommateData.drinker,
                aboutYou: roommateData.aboutYou,
                socialMediaAccounts: roommateData.socialMediaAccounts || [],
                matchScore: roommate.matchScore
            };
        });

        res.json({
            success: true,
            data: transformedRoommates
        });
    } catch (error) {
        console.error('Error in getTopMatches:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching potential roommates'
        });
    }
};

module.exports = {
    details,
    updateDetails,
    getTopMatches
};