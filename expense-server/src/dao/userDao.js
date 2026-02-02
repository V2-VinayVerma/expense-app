const User = require('../model/user');

const userDao = {
    findByEmail: async (email) => {
        const user = await User.findOne({ email }); //user obj returned by mongoDB
        return user;
    },
    create: async (userData) => {
        const newUser = new User(userData);
        try {
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('User already exists with this email')
            } else {
                console.log(error);
                throw new Error("Something went wrong while communicating with DB")
            }

        }

    },
};

module.exports = userDao;