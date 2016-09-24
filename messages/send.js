'use strict';

/**
 * Create the templates for sending responses back to the user
 * @type {cfg|exports|module.exports}
 */

const config = require('../config/config');
const client = require('twilio')(config.accountSid, config.authToken);

module.exports = {
    sendSMSMessage: sendSMSMessage,
    sendMMSMessage: sendMMSMessage
};

/**
 * Send an SMS (text) response back to the user
 * @param number Phone number to send message to
 * @param message Text message being sent to user
 */
function sendSMSMessage(number, message) {
    client.messages.create({
        to: number,
        from: config.sendingNumber,
        body: message
    }, function(err, message) {
        if (err) {
            console.error('Could not notify user');
            console.error(err);
        } else {
            console.log('user notified');
        }
    });
}

/**
 * Send an MMS (image) response back to the user
 * @param number Phone number to send message to
 * @param message Text message being sent to user
 * @param image Image URL being sent to user
 */
function sendMMSMessage(number, message, image) {
    client.messages.create({
        to: number,
        from: config.sendingNumber,
        body: message,
        mediaUrl: image
    }, function(err, message) {
        if (err) {
            console.error('Could not notify user');
            console.error(err);
        } else {
            console.log('user notified');
        }
    });
}