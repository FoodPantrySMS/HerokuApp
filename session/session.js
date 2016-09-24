'use strict';

let sessions = {};
let messengerSessions = {};
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
 * Find the current messenger session or create one if none exist
 * @param fbid The current user fbid
 * @returns the current messenger session
 */
var findOrCreateSessionMessenger = function (fbid) {
  var sessionId

  // DOES USER SESSION ALREADY EXIST?
  Object.keys(messengerSessions).forEach(k => {
    if (messengerSessions[k].fbid === fbid) {
      // YUP
      sessionId = k
    }
  })

  // No session so we will create one
  if (!sessionId) {
    sessionId = new Date().toISOString()
    messengerSessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }
  }

  return sessionId
}

/**
 * Get all user sessions
 */
function getSessions() {
    return sessions;
}

/**
 * Get all messenger sessions
 */
function getMessengerSessions() {
    return messengerSessions;
}

/**
 * Save current sessions
 * @param facebookSessions the current list of sessions
 */
function setSessions(appSessions) {
    sessions = appSessions;
}