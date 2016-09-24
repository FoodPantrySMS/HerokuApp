'use strict';

/**
 * Actions defined within WIT to receive parsed text response from WIT
 * @type {*|exports|module.exports}
 */

const send = require('../messages/send');

const actions = {
    send: sendAction,
    whereToEat: whereToEat
};

module.exports = {
    getActions: getActions
};

function getActions() {
    return actions;
}

function sendAction({sessionId, context}, {text}) {
    console.log("Sending Action");
    console.log(context);
    console.log(text);
    send.sendSMSMessage(context._id_, text);
    return Promise.resolve()
}

function whereToEat({context, entities}) {
    const id = context._id_;

    console.log("Where to Eat");
    console.log(context);
    console.log(entities);

    if(entities.location) {
        const location = entities.location[0].value;
        send.sendSMSMessage(context._id_, "This is your location: " + location);
    } else {
        context.missing_location = true;
    }

    return Promise.resolve(context);
}