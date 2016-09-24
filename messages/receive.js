'use strict';

/**
 * Receive message from user
 * This endpoint was configured within Twilio's console
 * @type {initializer|exports|module.exports}
 */

const twilio = require('twilio');
<<<<<<< HEAD
const wit = require('../wit-ai/wit-ai');
//const inputUtils = require('../utils/input-utils');
//const witUtils = require('../utils/wit-utils');
const constants = require('../config/constants');
=======
const wit = require('../wit/wit');
>>>>>>> origin/master
const express = require('express');
const router = express.Router();

router.get('/', initialLoad);
router.post('/message', receivedMessage);

module.exports = router;

/**
 * Initial route to show index page
 * Has no functionality behind it
 * @param req
 * @param res
 * @param next
 */
function initialLoad(req, res, next) {
    res.render('index', { title: 'Hack Hunger SMS Bot' });
}

/**
 * Route that receives info from Twilio whenever user sends us an SMS or MMS
 * @param req
 * @param res
 * @param next
 */
function receivedMessage(req, res, next) {
    const message = req.body.Body; //Message text
    const phoneNumber = req.body.From; //User phone number
    res.send("");
}