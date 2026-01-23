// console.log("Hii, I'm your server");

const express = require('express');
const app = express();

app.use(express.json());//Middleware


app.use('/register', (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({
         message: 'Name, Email, Password are required'
      })
   }

   const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      password: password
   };

   users.push(newUser);

   return res.status(200).json({
      message: "user registered",
      user: { id: newUser.id }
   });
});

app.listen(3000, () => { console.log("Server is running on port 3000") });