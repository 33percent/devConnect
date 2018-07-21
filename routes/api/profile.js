const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//load profile modle

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route GET /api/post/test
// @desc - Tests post routes
// @access - PUblic

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    const errors = {};
    Profile.findOne({
        user:req.user.id
    })
    .then((profile => {
        if(!profile) {
            errors.noprofile = 'There is no Profile for this user'
            return res.sendStatus(404).json(errors)
        }
        res.json(profile);
    }))
    .catch((err) => {
        res.sendStatus(404).json(err)
    })
})

module.exports = router;