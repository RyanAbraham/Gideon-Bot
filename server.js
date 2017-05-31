const Discord = require("discord.js");
require("dotenv").config();

const handlers = {};
const modules = [
  "help",
  "schedule",
  "card",
  "deck",
  "log"
];

/* Load modules */
modules.forEach(module => {
  const moduleObject = new (require("./modules/" + module + ".js"))();
  if(moduleObject) {
    moduleObject.getCommands().forEach(command => {
      handlers[command] = moduleObject;
    });
  } else {
    console.log(`Module ${module} could not be loaded`);
  }
});

/* Bot logs into server */
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

/* On bot login */
client.on("ready", () => {
  console.log("Gideon bot online");
  client.user.setGame("Magic: the Gideoning");
});

/* On any message in the server */
client.on("message", (msg) => {
  const query = msg.content.substr(process.env.PREFIX.length).split(" ");
  const command = query[0].toLowerCase();
  const parameter = query.length > 1 ? query.slice(1).join(" ") : "";
  // If the command prefix isn't used or the author is a bot, ignore the message
  if(!msg.content.startsWith(process.env.PREFIX) ||
      msg.author.bot ||
      !handlers[command]) {
    return;
  }

  // Handle the incoming command and try to resolve the returned promise
  const ret = handlers[command].handleMessage(command, parameter, msg);
  Promise.resolve(ret).catch(e => {
    console.log(`Error in promise: ${e}`);
  });
});

process.on("unhandledRejection", console.error);
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
