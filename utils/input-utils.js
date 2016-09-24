'use strict';

const emoji = require('emojione');
const constants = require('../config/constants'); 

module.exports = {
    detectEmoji: detectEmoji,
    parseEmoji: parseEmoji,
    parseLocation: parseLocation
}

function detectEmoji(text) {
    const decodedString = emoji.toShort(text);

    const colonCounts = decodedString.split(":").length - 1;
    return (colonCounts >= 2);
}

function parseEmoji(text) {
    const decodedString = emoji.toShort(text);
    const foodEmojis = constants.getFoodEmojis();
    for(let emoji of foodEmojis) {
        if(decodedString.includes(emoji)) {
            return "Where can I eat?";
        }
    }

    if(decodedString.includes(":grinning:")) {
        return "thank you";
    }

    return text;
}

function parseLocation(locationString) {
    let location = {
        location: null,
        type: null
    };

    if(parseInt(locationString)) {
        location.type = "zipcode";
    } else {
        location.type = "address";
    }

    location.location = locationString;

    return location;
}