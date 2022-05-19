const dotenv = require('dotenv/config');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
	name: 'start',
	description: 'Starts the Minecraft Server'
},
{
	name: 'address',
	description: 'Prints the Minecraft Server Address'
}]; 

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);


(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
		Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
		{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} 
	catch (error) {
		console.error(error);
	}
})();
