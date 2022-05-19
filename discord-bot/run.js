const compute= require('@google-cloud/compute');
const dotenv = require('dotenv/config');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function startInstance() {
	const projectId = process.env.PROJECT_ID;
	const zoneName = process.env.ZONE;
	const instanceName = process.env.INSTANCE_NAME;
	
	const instancesClient = new compute.InstancesClient();
	
    const [response] = await instancesClient.start({
	  project: projectId,
      zone: zoneName,
      instance: instanceName,
    });
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	let time=new Date();
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'start') {
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/start");
		startInstance();
		await interaction.reply({content: 'Starting the Minecraft Server :sunglasses:' +'\n'+'*Please wait as this can take a few minutes*', ephemeral: true});
	}
	if (interaction.commandName === 'address') {
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/address");
		await interaction.reply({content: process.env.SERVER_IP, ephemeral: true});
	}
});

client.login(process.env.DISCORD_TOKEN);

