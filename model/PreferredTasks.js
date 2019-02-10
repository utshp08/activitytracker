const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferredTasksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('PreferredTasks', PreferredTasksSchema);