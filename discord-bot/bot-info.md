# cloud-minecraft-server
#### Uses Discord's example project "https://github.com/discord/discord-example-app/blob/main/examples/command.js"
#### Also uses Google Cloud Compute JS example "https://github.com/googleapis/nodejs-compute/blob/main/samples/startInstance.js"
Requires ngrok to run `ngrok http 3000` and paste Forwarding address to Interactions Endpoint URL in Discord Dev Portal

Requires environment variable `GOOGLE_APPLICATION_CREDENTIALS` to define path to Google Cloud Service Account file 

.env contains:
 - PUBLIC_KEY
 - APP_ID
 - GUILD_ID (Discord Server ID)
 - DISCORD_TOKEN
 - SERVER_IP
 - PROJECT_ID (Google Cloud Project ID)
 - ZONE (Google Cloud VM Zone)
 - INSTANCE_NAME (Google Cloud VM Name)

