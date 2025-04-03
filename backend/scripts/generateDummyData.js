const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Indian_Davis_Community', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const majors = ['cs', 'ee', 'me', 'ce', 'bio', 'chem', 'math', 'econ'];
const degrees = ['bs', 'ms', 'phd'];
const countries = ['USA', 'India', 'China', 'South Korea', 'Japan', 'Canada', 'Mexico', 'Brazil'];
const states = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Washington', 'Massachusetts', 'Georgia'];
const genders = ['1', '2', '3']; // 1: Male, 2: Female, 3: Other
const preferences = ['0', '1']; // 0: No, 1: Yes

const generateDummyUsers = async () => {
    try {
        // Clear existing users except admin
        await User.deleteMany({ email: { $ne: 'admin@ucdavis.edu' } });

        const dummyUsers = [];
        const numUsers = 20;

        for (let i = 0; i < numUsers; i++) {
            const firstName = `User${i + 1}`;
            const lastName = `Test${i + 1}`;
            const email = `user${i + 1}@ucdavis.edu`;
            const password = await bcrypt.hash('password123', 10);
            const ucDavisId = `UCD${Math.floor(10000000 + Math.random() * 90000000)}`;

            const fromDate = new Date();
            fromDate.setMonth(fromDate.getMonth() - Math.floor(Math.random() * 12));
            const toDate = new Date(fromDate);
            toDate.setFullYear(toDate.getFullYear() + 1);

            const user = {
                firstName,
                lastName,
                email,
                password,
                ucDavisId,
                fromDate,
                toDate,
                country: countries[Math.floor(Math.random() * countries.length)],
                region: states[Math.floor(Math.random() * states.length)],
                major: majors[Math.floor(Math.random() * majors.length)],
                degree: degrees[Math.floor(Math.random() * degrees.length)],
                gender: genders[Math.floor(Math.random() * genders.length)],
                smoker: preferences[Math.floor(Math.random() * preferences.length)],
                drinker: preferences[Math.floor(Math.random() * preferences.length)],
                lookingForRoommate: '1',
                foodPreference: preferences[Math.floor(Math.random() * preferences.length)],
                socialMediaAccounts: [
                    {
                        platform: 'facebook',
                        username: `user${i + 1}`
                    },
                    {
                        platform: 'instagram',
                        username: `user${i + 1}`
                    }
                ],
                aboutYou: `I am a ${degrees[Math.floor(Math.random() * degrees.length)].toUpperCase()} student in ${majors[Math.floor(Math.random() * majors.length)].toUpperCase()}. I love ${['reading', 'gaming', 'cooking', 'traveling', 'music', 'sports'][Math.floor(Math.random() * 6)]} and looking for a roommate who shares similar interests.`,
                noiseTolerance: Math.floor(Math.random() * 5) + 1,
                cleanlinessLevel: Math.floor(Math.random() * 5) + 1,
                socialComfortLevel: Math.floor(Math.random() * 5) + 1,
                noiseImportance: Math.floor(Math.random() * 5) + 1,
                cleanlinessImportance: Math.floor(Math.random() * 5) + 1,
                socialImportance: Math.floor(Math.random() * 5) + 1,
                monthlyBudgetMin: Math.floor(Math.random() * 500) + 500,
                monthlyBudgetMax: Math.floor(Math.random() * 1000) + 1000,
                housingType: ['apartment', 'house', 'studio'][Math.floor(Math.random() * 3)],
                petFriendly: Math.random() > 0.5,
                hobbies: ['Reading', 'Gaming', 'Cooking', 'Traveling', 'Music', 'Sports'][Math.floor(Math.random() * 6)]
            };

            dummyUsers.push(user);
        }

        await User.insertMany(dummyUsers);
        console.log(`Successfully created ${numUsers} dummy users`);
        process.exit(0);
    } catch (error) {
        console.error('Error generating dummy data:', error);
        process.exit(1);
    }
};

generateDummyUsers(); 