const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');


const router = express.Router();

const loginValidator = [
    body('email').notEmpty().withMessage("email is required")
    .isEmail().withMessage("Provided email is not valid"),

    body('password')
    .notEmpty().withMessage("password is required")
    .isLength({min:3}.withMessage("Password must be at least 3 chars long"))
]

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('is-user-logged-in', authController.isUserLoggedIn);
router.post('/logout', authController.logout);
router.post('google-auht', authController.googleSso);


module.exports = router;