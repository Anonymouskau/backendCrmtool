import twilio from 'twilio'


// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC28c2bb13a74a2d82db20df22057d7034";
const authToken = "e3a9609ce44d6f076833d70bced16a67";
const client = twilio(accountSid, authToken);

export default client