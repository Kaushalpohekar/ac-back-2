const express = require('express');
const router = express.Router();
const main = require('./mqtt-control/main');


router.get('/status', main.fetchStatus);
router.get('/time', main.fetchOnOffTimings);

module.exports = router;
