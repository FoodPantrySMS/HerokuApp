const {Wit, log} = require('node-wit');
const session = require('../session/session');
const actions = require('./actions').getActions();

const wit = new Wit({
    accessToken: process.env.WIT_ACCESS_TOKEN,
    actions,
    logger: new log.Logger(log.INFO)
});

module.exports = {
    callWitAI: callWitAI
};

/**
 * Send current session and user entered text to WIT-AI
 * @param facebookID the Facebook ID of the current user
 * @param text The text the Facebook user sent through the Bot
 */ 
function callWitAI(id, text) {
    const sessionID = session.findOrCreateSession(id);
    const sessions = session.getSessions();
    wit.runActions(
        sessionID,
        text,
        sessions[sessionID].context,
        (error, context) => {
            if (error) {
                console.log('Oops! Got an error from Wit:', error);
            } else {
                sessions[sessionId].context = context;
                session.setSessions(sessions);
            }
        }
    );
}