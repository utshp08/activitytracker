const mongoose = require('mongoose');

require('../model/user');
const user = mongoose.model('User');


exports.register = (req, res) => {
    if (req.body.password == req.body.confirm) {
        let newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save()
            .then(user => {
                req.flash('success_msg', "New user registered.");
                res.redirect('/login');
            })
            .catch(err => console.log(err));
    }

};