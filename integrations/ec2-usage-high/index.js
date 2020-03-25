const axios = require("axios");
require("dotenv").config();

module.exports.handler = event => {
  console.log(JSON.stringify(event, 4, null));

  messageParsed = JSON.parse(event.Records[0].Sns.Message);

  const message = {
    text: event.Records[0].Sns.Subject,
    attachments: [
      {
        type: "mrkdwn",
        text: `:loudspeaker: *Cloudwatch Alarm Triggered*`,
        color: "warning"
      },
      {
        type: "mrkdwn",
        text: `*Acount:* \n${messageParsed.AWSAccountId}`,
        color: "warning"
      },
      {
        type: "mrkdwn",
        text: `*Region:* \n${messageParsed.Region}`,
        color: "warning"
      },
      {
        type: "mrkdwn",
        text: `*Status:* \n${messageParsed.NewStateValue}`,
        color: "warning"
      },
      {
        type: "mrkdwn",
        text: `*Reason:* \n${messageParsed.NewStateReason}`,
        color: "warning"
      }
    ]
  };

  return axios
    .post(process.env.WEBHOOK, message)
    .then(response => "ENV WORKS")
    .catch(e => console.log(e));
};
