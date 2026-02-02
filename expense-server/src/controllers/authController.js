const userDao = require("../dao/userDao");
const express = require("express");
const bcrypt = require('bcryptjs');   // passwword security k liye...encryption
const {validationResult} = require('express-validator');



const jwt = require('jsonwebtoken');
const authController = {
  login: async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    try {
      const user = await userDao.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (user && isPasswordMatched) {
        const token = jwt.sign({
          name: user.name,
          email: user.email,
          id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwtToken', token, {
          httpOnly: true,
          secure: true,
          domain: 'localhost',
          path: '/'
        });

        return res.status(200).json({
          message: "User authenticated",
          user: user,
        });
      } else {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Login failed",
      });
    }
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, Email, Password are required",
      });
    }

    try {
      const existingUser = await userDao.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          message: "User with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await userDao.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      // Issue JWT token on successful registration
      const token = jwt.sign({
        name: user.name,
        email: user.email,
        id: user._id
      }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        path: '/'
      });

      return res.status(201).json({
        message: "User Registered Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Registration failed",
      });
    }
  },
  isUserLoggedIn: async (req, res)=>{
      try{
        const token= req.cookies?.jwtToken;
if(!token){
  return res.status(401).json({
    message: "Unauthorized access"
  });
}


jwt.verify(token, process.env.JWT_SECRET, (error, user)=>{
  if(error)
  {

  }
})

      }
     catch(error){
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error"
      })
    }
  }
}
module.exports = authController;