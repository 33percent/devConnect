const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//body parser
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
//routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

dotenv.config();

//db configuration
const db = require('./config/keys').mongoURI;

//connect to database
mongoose
    .connect(db)
    .then(() => {
        console.log('connected');
    })
    .catch(err => console.log(err));


//passport config

app.use(passport.initialize())
require('./config/passport')(passport);
// use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});