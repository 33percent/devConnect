const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// @route GET /api/post/test
// @desc - Tests post routes
// @access - PUblic

router.route('/register').post((req, res, next) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.sendStatus(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(
                req.body.email, {
                    s: 200,
                    r: 'pg',
                    d: 'mm'
                }
            )
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    }
                })
            })

        }
    })
});

router.route('/login').post((req, res, next) => {
    //check validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);


    const email = req.body.email;
    const password = req.body.password;

    //finf the user by email
    User.findOne({
            email
        })
        .then(user => {
            //check for uyser
            if (!user) {
                errors.email = "User not found";
                return res.sendStatus(404).json(errors);
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar
                        };
                        jwt.sign(payload, keys.secrectOrKey, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.sendStatus(200).json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                    } else {
                        errors.password = "Password incorrect";
                        return res.sendStatus(400).json(errors);
                    }
                })
        })
});

router.route('/current').get(passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;