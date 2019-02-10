const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    user: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now()
    },
    end : {
        type: Date,
        required: false,
        nullable: true
    },
    duration: {
        type: String,
        required: false,
        nullable: true
    },
    remarks : {
        type: String,
        required: false,
        nullable: true
    },
    status : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);