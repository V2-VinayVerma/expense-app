const express = require('express');

const authRoutes = require('../expense-server/src/routes/authRoutes');
const app = express();

app.use(express.json());


app.use('/auth', authRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});