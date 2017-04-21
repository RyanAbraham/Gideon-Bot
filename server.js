const Discord = require("discord.js");
require("dotenv").config();

const prefix = process.env.COMMAND_PREFIX || "!"; // Prefix for bot commands
const modules = [
  "schedule"
];
const handlers = {};

modules.forEach(module => {
  const moduleObject = new (require("./modules/" + module + ".js"))();
  if(moduleObject) {
    moduleObject.getCommands().forEach(command => {
      handlers[command] = moduleObject;
    });
  } else {
    console.log("Module " + module + " could not be loaded");
  }
});

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);


/* On bot login */
client.on("ready", () => {
  console.log("Gideon bot online");
});

/* On any message in the server */
client.on("message", (msg) => {
  const query = msg.content.substr(prefix.length).split(" ");
  const command = query[0].toLowerCase();
  const parameter = query.length > 1 ? query.slice(1).join(" ") : "";
  // If the command prefix isn't used or the author is a bot, ignore the message
  if(!msg.content.startsWith(prefix) ||
      msg.author.bot ||
      !handlers[command]) {
    return;
  }

  const ret = handlers[command].handleMessage(command, parameter, msg);
  // if ret is undefined or not a thenable this just returns a resolved promise and the callback won't be called
  Promise.resolve(ret).catch(e => console.log("An error occured while handling", msg.content.green, ":\n", e));
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
