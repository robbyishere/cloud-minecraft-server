const dotenv = require('dotenv/config');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const {exec} = require('child_process');

function statusCheck(){
//Changes Discord Bot's online status to reflect VM's status
	exec("az vm list -d -g Minecraft-Server || grep Minecraft-Server  VM RUNNING",(err,stdout) => {
		  if(!err){
			if(stdout){
				client.user.setStatus('online');
			}
			else{
				client.user.setStatus('dnd');
			}
		  }
	  });
	setTimeout(statusCheck,60000);
}
	
	  
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	statusCheck();
});

client.on('interactionCreate', async interaction => {
	let time=new Date();
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'start') {
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/start");
		exec('az vm start -g Minecraft-Server -n Minecraft-VM');
		await interaction.reply({content: 'Starting the Minecraft Server :sunglasses:' +'\n'+'*Please wait as this can take a few minutes*', ephemeral: true});
	}
	if (interaction.commandName === 'address') {
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/address");
		await interaction.reply({content: process.env.SERVER_IP, ephemeral: true});
	}
});

client.login(process.env.DISCORD_TOKEN);

