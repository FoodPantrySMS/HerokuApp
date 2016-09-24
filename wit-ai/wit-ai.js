const {Wit, log} = require('node-wit');

/**
 * Route that receives info from Twilio whenever user sends us an SMS or MMS
 * @param phoneNumber
 * @param message
 */
function callWitAI(phoneNumber, msg)
{
	const client = new Wit({accessToken: process.env.WIT_SERVER_ACCESS_TOKEN});
	client.message(msg, {})
	.then((data) => {
	  console.log('Wit.ai response: ' + JSON.stringify(data));
	}).catch(console.error);
}	