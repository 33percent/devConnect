const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.load();

//db configuration
const db = require('./config/keys').mongoURI;

//connect to database
mongoose
    .connect(db)
    .then(() => {
        console.log('connected');
    })
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('hello world')
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});