/**
* Configuration for Twilio
* Adds twilio access variables to app environment variables
* @type {*|exports|module.exports}
*/

const dotenv = require('dotenv');
const cfg = {};

dotenv.config({path: 'config/.env'});

cfg.port = process.env.PORT || 3000;

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;
cfg.appUrl = process.env.APP_URL;
cfg.appProtocol = process.env.APP_PROTOCOL;

const requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber, cfg.appUrl, cfg.appProtocol];
const isConfigured = requiredConfig.every(function(configValue) {
   return configValue || false;
});

if (!isConfigured) {
   const errorMessage =
       'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, APP_URL, APP_PROTOCOL, and TWILIO_NUMBER must be set.';

   throw new Error(errorMessage);
}

module.exports = cfg;