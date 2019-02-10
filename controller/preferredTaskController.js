const mongoose = require('mongoose');

//Load Schemas/Model
require('../model/user');
const User = mongoose.model('User');
require('../model//Task');
const Task = mongoose.model('Task');
require('../model//PreferredTasks');
const PreferredTasks = mongoose.model('PreferredTasks');

exports.index = (req, res) => {
    PreferredTasks.find()
        .sort({ name: 'asc' })
        .then(preferredTask => {
            res.render('tasks/preferred-tasks/index', { title: "Preferred Tasks", preferredTask: preferredTask });
        })
        .catch(err => console.log(err));
};

//Save new preferred Tasks
exports.new = (req, res) => {
    preferredTask = new PreferredTasks({
        name: req.body.task_name
    })
        .save()
        .then(preferredTask => {
            req.flash('success_msg', 'New preferred task added to the lists.');
            res.redirect('/tasks/preferred-tasks');
        })
        .catch(err => console.log(err));
};

//Delete preferred task
exports.delete = (req, res) => {
    PreferredTasks.deleteOne({_id : req.params.id}, (err, tasks) => {
        req.flash('success_msg', 'One preferred task has been removed.');
        res.redirect('/tasks/preferred-tasks');
    }).catch(err => {
        req.flash('err_msg', 'Error. Cannot Delete Task.' + err);
        res.redirect('/tasks/preferred-tasks');
    })
};