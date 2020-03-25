const Particle = require("particle-api-js");
require("dotenv").config();

const token = process.env.TOKEN;
const device = process.env.DEVICE_ID;
const functionName = process.env.FUNCTION_NAME;

const particle = new Particle();

module.exports.handler = event => {
  console.log("Lambda called", JSON.stringify(event, null, 4));

  const messageParsed = JSON.parse(event.Records[0].Sns.Message);

  console.log(messageParsed);

  // We have a finding, call the thing!
  return particle
    .callFunction({
      deviceId: `${device}`,
      name: functionName,
      argument: "2",
      auth: token
    })
    .then(data => {
      console.log("Function called succesfully: ", data);
    })
    .catch(error => {
      console.log("Function called with error: ", error);
    });
};
