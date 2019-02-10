const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

require('../config/passport');

//Load Schemas/Model
require('../model/user');
const User = mongoose.model('User');


router.get('/', (req, res) => {
    res.send('users');
});
router.get('/login', (req, res) => {
    res.render('user/login');
});
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/user/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/user/login',
    failureFlash: true
})), (req, res, next) => {
    if (req.user) {
        req.logIn(user);
    }
};


router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            if (req.body.password == req.body.confirm) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {

                        let newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });

                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', "New user has been register.");
                                res.redirect('/user/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        } else {
            req.flash('error_msg', 'Email is already registered.');
            console.log(user);
            res.redirect('/user/login');
        }
    });
});

module.exports = router;