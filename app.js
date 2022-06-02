// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

let endpoint = process.env.API_URL
const bearerToken = process.env.MGMT_API_ACCESS_TOKEN

// HTTP POST
app.command("/create", async ({ command, ack, say }) => {
    await ack();

    const bodyParameters = {
      name: `${command.text}`
    }

    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` }
    };

    axios.post(`${process.env.API_URL}`, bodyParameters, config)
    .then((response) => {
      console.log(`Tenant: ${response.data.tenant}, Client/Application ID: ${response.data.client_id}, Name: ${response.data.name}`);
      say(`Tenant: ${response.data.tenant}, Client/Application ID: ${response.data.client_id}, Name: ${response.data.name}`)
    })
    .catch((error) => {
      console.error(error);
    });
});

// HTTP PATCH
app.command("/update", async ({ command, ack, say }) => {
    await ack();

    const params = command.text.split(' ') // ID, NewName
    
    endpoint = `${endpoint}/${params[0]}`
    
    // Update name only for now
    const bodyParameters = {
      name: `${params[1]}`
    }

    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` }
    };

    axios.patch(`${endpoint}`, bodyParameters, config)
    .then((response) => {
      console.log(`Tenant: ${response.data.tenant}, Client/Application ID: ${response.data.client_id}, Name: ${response.data.name}`);
      say(`Tenant: ${response.data.tenant}, Client/Application ID: ${response.data.client_id}, Name: ${response.data.name}`)
    })
    .catch((error) => {
      console.error(error);
    });
});

// HTTP DELETE
app.command("/delete", async ({ command, ack, say }) => {
      await ack();
      
      if (command.text) {
        endpoint = `${process.env.API_URL}/${command.text}`
      
        const config = {
          headers: { Authorization: `Bearer ${bearerToken}` }
        };

        axios.delete(`${endpoint}`, config)
        .then((response) => {
          say(`Client/Application ID Removed: ${response.data.name}`);
          console.log(`Client/Application ID Removed: ${command.text}`);
        })
        .catch((error) => {
          console.error(error);
        });
      }
});

// HTTP GET
app.command("/retrieve", async ({ command, ack, say }) => {
    await ack();

    if (command.text) {
      endpoint = `${endpoint}/${command.text}`
    }

    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` }
    };

    axios.get(`${endpoint}`, config)
    .then((response) => {
      say(`Tenant: ${response.data.tenant}, Client/Application: ${response.data.name}`);
      console.log(`Tenant: ${response.data.tenant}, Client/Application ID: ${response.data.name}`);
    })
    .catch((error) => {
      console.error(error);
    });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ server is running!!!');
})();
