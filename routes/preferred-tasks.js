const express = require('express');
const router = express.Router();
const preferredTaskCtl = require('../controller/preferredTaskController');
const {ensureAuthenticated} = require('../helpers/auth');

router.route('/')
.get(ensureAuthenticated, preferredTaskCtl.index)
.post(ensureAuthenticated, preferredTaskCtl.new)

router.route('/:id')
.delete(ensureAuthenticated, preferredTaskCtl.delete);

module.exports = router;