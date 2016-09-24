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

function callWithMessengerAI(id, text) {
        const sessionID = session.findOrCreateSessionMessenger(id);
        const sessions = session.getMessengerSessions();
        wit.runActions(
			sessionId, // the user's current session by id
			text,  // the user's message
			messengerSessions[sessionId].context, // the user's session state
			function (error, context) { // callback
			if (error) {
				console.log('oops!', error)
			} else {
				// Updating the user's current session state
				messengerSessions[sessionId].context = context;
			}
		})

}