'use strict';

let sessions = {};

module.exports = {
    findOrCreateSession: findOrCreateSession,
    getSessions: getSessions,
    setSessions: setSessions
};

/**
 * Find the current session or create one if none exist
 * @param id The current users phone number
 * @returns the current session
 */
function findOrCreateSession(id) {
    let sessionId;

    if (!sessionId) {
        sessionId = new Date().toISOString();
        sessions[sessionId] = {
          id: id,
          context: {
            _id_: id
          }
        };
    }

    return sessionId;
}

/**
 * Get all user sessions
 */
function getSessions() {
    return sessions;
}

/**
 * Save current sessions
 * @param facebookSessions the current list of sessions
 */
function setSessions(appSessions) {
    sessions = appSessions;
}