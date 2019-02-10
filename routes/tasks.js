const express = require('express');
const taskController = require('../controller/taskController');
const router = express.Router();
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');



router.route('/')
.get(ensureAuthenticated,taskController.index)
.post(ensureAuthenticated,taskController.new);

router.route('/:id')
.patch(ensureAuthenticated,taskController.update)
.put(ensureAuthenticated,taskController.update)
.delete(ensureAuthenticated,taskController.delete);

router.route('/add-remarks/:id')
.get(ensureAuthenticated,taskController.new_remarks)
.patch(ensureAuthenticated,taskController.save_remarks)
.put(ensureAuthenticated,taskController.save_remarks);

module.exports = router;