const mongoose = require('mongoose');
const timediff = require('timediff');

//Load Schemas/Model
require('../model//Task');
const Task = mongoose.model('Task');
require('../model//PreferredTasks');
const PreferredTasks = mongoose.model('PreferredTasks');




//Get tasks
exports.index = (req, res) => {
    let preferredTasks = [];
    let ctr = 0;
    let active = false;
    PreferredTasks.find()
        .then(preferredTask => {
            preferredTasks = preferredTask;
            ctr = 0;
            active = false;
        }).catch(err => console.log(err));
        
        Task.find({user: req.user.id})
        .sort({ start: 'desc' })
        .then(tasks => {
            tasks.forEach(e => {
                if(e['status'] == false) {
                    ctr += 1;
                }
            });
            active = ctr > 0;
            res.render('tasks/index', { title: "Tasks", tasks: tasks, preferredTasks: preferredTasks, ctr : ctr, active : active});
        })
};


// Save tasks
exports.new = (req, res) => {
    let task_name = "";
    PreferredTasks.findOne({
        _id: req.body.preferredTask
    }).then(preferredTask => {
        task = new Task({
            name: preferredTask.name,
            start: Date.now(), 
            user: req.user.id
        })
        task.save()
        .then(() => {
            req.flash('success_msg', 'New task started.');
            res.redirect('/tasks');
        }).catch(err => console.log(err));
    }).catch(err => {
        req.flash('error_msg', 'Error! Cannot add task. ' + err);
        res.redirect('/tasks');
    });
};

// End Tasks - Update tasks collection
exports.update = (req, res) => {
    Task.findOne({_id : req.params.id}, (err, task) => {
        task.end = Date.now();
        task.status = true;
        let duration = timediff(task.start, Date.now(), 'HH:mm:SS', true);
        task.duration = duration["hours"] + ":" +duration["minutes"] + ":" + duration["seconds"];
        task.save()
        .then(()=>{
            req.flash('success_msg', 'Task ended.');
            res.redirect('/tasks');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

// ADD REMARKS
exports.new_remarks = (req, res) => {
    res.render('tasks/add-remarks', {task_id : req.params.id});
};

//Save Remarks
exports.save_remarks = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        task.remarks = req.body.remarks;
        task.save()
        .then(task => {
            req.flash('success_msg', 'Remarks has been set.');
            res.redirect('/tasks');
        }).catch(err => {
            req.flash('error_msg', 'Error adding remarks. '+ err);
        });
    });
};

//DELETE TASK
exports.delete = (req, res) => {
    Task.deleteOne({_id: req.params.id})
    .then(() => {
        res.redirect('/tasks');
    })
    .catch(err => console.log(err));
};
