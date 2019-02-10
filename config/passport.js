const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../model/user');
const user = mongoose.model('User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        (username, password, done) => {
            user.findOne({ email: username }, (err, user) => {
                if (!user) return done(null, false, {message: "No user found."});
                bcrypt.compare(password, user.password).then(match => {
                    if (!match) {
                        return done(null, false, {message: "No user found."});
                    } else {
                        return done(null, user, {message: "No user found."});
                    }
                });
            });
            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            passport.deserializeUser(function (id, done) {
                user.findById(id, function (err, user) {
                    done(err, user);
                });
            });
        }));

}