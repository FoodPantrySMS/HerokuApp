'use strict';

/**
 * Actions defined within WIT to receive parsed text response from WIT
 * @type {*|exports|module.exports}
 */

const send = require('../messages/send');
const api = require('../api/api');
const inputUtils = require('../utils/input-utils');

const actions = {
    send: sendAction,
    whereToEat: whereToEat,
    thankYou: thankYou,
    needHelp: needHelp
};

module.exports = {
    getActions: getActions
};

function getActions() {
    return actions;
}

function sendAction({sessionId, context}, {text}) {
    if(context.location) {
        api.callAPI(context.location.location, context.location.type)
        .then(function(data) {
            const newData = JSON.parse(data);
            const locationData = newData.data.results;
            if(locationData.length < 1) {
                send.sendSMSMessage(context._id_, "I'm sorry. I didn't find any locations nearby.");
                return;
            }
            send.sendSMSMessage(context._id_, "I found the following results within 10 miles of here.");
            setTimeout(function() {
                for(let location of locationData) {
                    const programName = location.ProgramName || "";
                    const streetName = location.StreetName || "";
                    const hours = location.Hours || "";
                    const formattedLocation = programName + " located at " + streetName + " opens at: " + hours;
                    send.sendSMSMessage(context._id_, formattedLocation);
                }
            }, 1000);
        }, function(err) {
            send.sendSMSMessage(context._id_, "I'm sorry. I didn't find any places nearby.");
        });
    } else {
        send.sendSMSMessage(context._id_, text);
    }
    return Promise.resolve();
}

function whereToEat({context, entities}) {
    const id = context._id_;

    if(entities.location) {
        const parsedLocation = inputUtils.parseLocation(entities.location[0].value);
        context.location = parsedLocation;
    } else {
        context.missing_location = true;
        return Promise.resolve(context);
    }

    return Promise.resolve(context);
}

function thankYou({context,  entities}) {
    const id = context._id_;
    context.thanks = true;
    return Promise.resolve(context);
}

function needHelp({context, entities}) {
    const id = context._id_;

    context.help = "Ask me questions about where the nearest meal is being served. For example, ask me 'Where can I eat?'";

    return Promise.resolve(context);
}