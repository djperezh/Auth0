Auth0 Tenant Client/Application API
=================

## Requirements

- Node (ver 14 recommended)
- Axios
- npm
- yarn (recomended)

## Technologies

- [Auth0](https://auth0.com/docs/api/management/v2/#!/Clients/delete_clients_by_id)
- [Slack bolt-js](https://api.slack.com/start/building/bolt-js)
- [Slack API](https://api.slack.com/apps)

> Enable `Slash Commands` in the Salck App configuration including the CRUD commands: Create, Retrieve, Update, Delete. You will need your own API URL Endpoint for this (you can get it once you start the server... see following information about `Dev Setup`)

Project Structure
------------

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server. It's where you'll add your app's listeners.
- `.env` is where you'll put your Slack app's authorization token and signing secret.

## Dev SetUp

- You need Auth0 Account and Slack Account (Free account are enough)
- YOu need to create an Slack App using the [Slack API](https://api.slack.com/apps)
- Clone [repository](https://github.com/djperezh/Auth0)
- Update the values in the .env file using your own tokens

```bash
SLACK_BOT_TOKEN=<SLACK_BOT_TOKEN>
SLACK_SIGNING_SECRET=<SLACK_SECRET>
API_URL=<YOUR_API_URL>
MGMT_API_ACCESS_TOKEN=<YOUR_AUTH0_TOKEN>
```

- Install packages by running the following command:

```bash
yarn install
```

- Start the server. 
> You can use [glitch](https://glitch.com/) which is very friendly. However you will need to copy the code manually to glitch's IDE

> TEST