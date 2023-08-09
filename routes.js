const express = require('express');
const router = express.Router();
const main = require('./mqtt-control/main');


router.get('/status', main.fetchStatus);

module.exports = router;
