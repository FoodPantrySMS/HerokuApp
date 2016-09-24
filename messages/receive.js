'use strict';

/**
 * Receive message from user
 * This endpoint was configured within Twilio's console
 * @type {initializer|exports|module.exports}
 */

const utils = require('../utils/input-utils');
const wit = require('../wit-ai/wit-ai');
const express = require('express');
const router = express.Router();
const Bot = require('messenger-bot');

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
    if(utils.detectEmoji(message)) {
        wit.callWitAI(phoneNumber, utils.parseEmoji(message));
    } else {
        wit.callWitAI(phoneNumber, message);
    }
    res.send("");
}

let bot = new Bot({
  token: 'EAAZAoNZBdLTzsBALjTkroKuDmGVZCsa1ZBL7fvJn9DuUpoguvLxIzMd0t8h4y7qx2Rnx6M2Ck4hXqom3J94K1vOxhKGpDnNQseZA9qjZB92sfOJ0oC99j5p2hwmIujEY2eioKunL0YEOek2nHmZB0SVu8Y31PvtZCeaIHSZBG093ZBngZDZD',
  verify: 'VERIFY_TOKEN',
  app_secret: '4710fb01ea84b4640b1cf9e8589f80a7'
})
bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text
  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    callWithMessengerAI(payload, text);
  })
})
