require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const mongoose = require('mongoose');
const authRoutes = require('../expense-server/src/routes/authRoutes');
const groupRoutes = require('../expense-server/src/routes/groupRoutes');

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true
};

const app = express();

console.log('MongoDB URI:', process.env.MONGO_DB_CONNECTION_URL);

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
    .then(() => console.log("Connected to mongoDB🔥🚀"))
    .catch((err) => console.log("couldn't connect to database", err))


app.use(cors(corsOption));
app.use(express.json());  //middleware
app.use(cookieParser()); //middleware


app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
