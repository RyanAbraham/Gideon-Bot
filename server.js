const Discord = require("discord.js");
require("dotenv").config();

const prefix = process.env.COMMAND_PREFIX || "!"; // Prefix for bot commands

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

/* On bot login */
client.on("ready", () => {
  console.log("Gideon bot online");
});

/* On any message in the server */
client.on("message", (message) => {
  // If the command prefix isn't used or the author is a bot, ignore the message
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  if(message.content.startsWith(prefix + "gideon")) {
    message.channel.sendMessage("Gideon bot online");
  }
  console.log(message.author.username);
});
