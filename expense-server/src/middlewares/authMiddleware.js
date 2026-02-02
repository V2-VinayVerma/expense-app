const jwt = require('jsonwebtoken');
const authMiddleware = {
    protect: async (req, res, next) => {
        try {
            const token = req.cookies?.jwtToken;

            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized access"
                });
            }

            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = user;
                next();
            } catch (error) {
                res.status(401).json({
                    message: "Unauthorized access"
                });
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
};

module.exports = authMiddleware;