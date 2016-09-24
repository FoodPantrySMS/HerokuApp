const request = require('request-promise');

module.exports = {
    callAPI: callAPI
}

function callAPI(location, locationType) {
    return new Promise(function(resolve, reject) {
        request("http://104.131.19.253:3000/programs?address=" + location + "&radius=10&limit=3")
        .then(function(data) {
            resolve(data);
        })
        .catch(function(err) {
            reject(err);
        });
    });
}