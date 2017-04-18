const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');

dotenv.config();

var TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);

client.on('ready', () => {
  console.log("THE GIDEON BEGINS");
});

client.on("message", (message) => {
  if(message.content.startsWith("gideon")) {
    message.channel.sendMessage("Gideon bot online");
  }
});
