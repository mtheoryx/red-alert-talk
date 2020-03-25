const Twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;
const client = new Twilio(accountSid, authToken);

module.exports.handler = event => {
  console.log("Lambda called", JSON.stringify(event, null, 4));

  const message = `AWS Root Activity!
  Account: ${event.detail.userIdentity.principalId}
  at ${event.detail.eventTime}`;
  console.log(message);

  return client.messages
    .create({
      body: `${message}`,
      to: `${toNumber}`,
      from: `${fromNumber}`
    })
    .then(message => console.log(message.status))
    .catch(e => console.log(JSON.stringify(e, null, 4)));
};
