const dotenv = require('dotenv/config');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const {exec} = require('child_process');
var serverStatus=0;

function statusCheck(){
//Changes Discord Bot's online status to reflect VM's status
	exec("az vm list -d -g Minecraft-Server",(err,stdout) => {
		if(!err){
			var json=JSON.parse(stdout);
			var vmStatus=json[0].powerState
			if(vmStatus=='VM running'||vmStatus=='VM starting'){
				client.user.setStatus('online');
				serverStatus=1;
			}
			else if(vmStatus=='VM stopped'){
				client.user.setStatus('dnd');
				serverStatus=0;
			}
			else{
				client.user.setStatus('invisible');
				console.log("Other Power State: "+vmStatus);
				serverStatus=0;
			}
		  }
		  else{
			  console.log("Error\n"+err);
			  console.log("Output\n"+stdout);

			  client.user.setStatus('invisible');
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
		var reply="Reply not set";
		const successStart="Starting the Minecraft Server :sunglasses: \n*Please wait as this can take a few minutes*";
		const alreadyStart="What are you doing???\nThe Server already started :stuck_out_tongue:";
		const tryAgain="Please wait a minute and try again";
		
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/start");
		if(serverStatus==0){
			exec('az vm start -g Minecraft-Server -n Minecraft-VM',(err,stdout) => {
				if(err) {
					console.log("VM Start Failed");
					console.log("Error\n"+err);
					console.log("Output\n"+stdout);
					interaction.followUp({content: "Server failed to start :disappointed:", ephemeral: true});
				}
			});
			reply=successStart;
		}
		else{
			reply=alreadyStart;
		}
		await interaction.reply({content: reply, ephemeral: true});
	}
	}
	if (interaction.commandName === 'address') {
		console.log(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+interaction.user.username+" "+"/address");
		await interaction.reply({content: process.env.SERVER_IP, ephemeral: true});
	}
});

client.login(process.env.DISCORD_TOKEN);

