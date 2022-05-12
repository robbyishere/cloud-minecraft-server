import express from 'express';
import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, DiscordRequest } from './utils.js';

// Create and configure express app
const app = express();
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', function (req, res) {
  let time=new Date();
  // Interaction type and data
  const { type, data } = req.body;
  
  //Verification for initialization
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  } 
  
  /**
   * Handle slash command requests
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    if (data.name === 'start') {
	  console.log(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+"/start")
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {content: 'Starting Minecraft Server'},
      });
    }
	if (data.name === 'address') {
		console.log(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+"/address")
		return res.send({
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {content: process.env.SERVER_IP},
		});
	}
  }
});

async function createCommand() {
  const appId = process.env.APP_ID;
  const guildId = process.env.GUILD_ID;
  
  /**
   * Guild-scoped slash commands
   * See https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command
   */
  const guildEndpoint = `applications/${appId}/guilds/${guildId}/commands`;
  const commandBody = {
    name: 'start',
    description: 'Starts Minecraft Server',
    // chat command (see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)
    type: 1,
  };
  const commandBody2 = {
    name: 'address',
    description: 'Prints Server IP',
    type: 1,
  };

  try {
    // Send HTTP request with bot token
    const res = await DiscordRequest(guildEndpoint, {
      method: 'POST',
      body: commandBody,
    });
    console.log(await res.json());
	const res2 = await DiscordRequest(guildEndpoint, {
      method: 'POST',
      body: commandBody2,
    });
    console.log(await res2.json());
  } catch (err) {
    console.error('Error installing commands: ', err);
  }
}

app.listen(3000, () => {
  console.log('Listening on port 3000');
  createCommand();
});
