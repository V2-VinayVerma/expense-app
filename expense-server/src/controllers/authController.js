const users = require('../dao/userDB');
const authController = {
    login: (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        return res.status(200).json({
            message: 'User authenticated',
            user: { id: user.id, name: user.name }
        });
    },

    register: (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, Email, Password are required'
            });
        }

        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({
                message: `User already exists with the email: ${email}`
            });
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password
        };

        users.push(newUser);

        return res.status(200).json({
            message: 'User Registered',
            user: { id: newUser.id }
        });
    }
};

module.exports = authController;