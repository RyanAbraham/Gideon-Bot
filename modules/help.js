/**
 * Responds with help for all commands
 */
require("dotenv").config();
const PFX = process.env.PREFIX;
class Help {
  constructor() {
    this.COMMANDS = ["help"];
    this.HELP_TEXT = `${PFX}card <cardname> -> Search for a card`
      + `\n${PFX}schedule <day|format|location> -> Display the event schedule`
      + `\n${PFX}deck <deckURL> -> Deal sample hands from a deck`
  }

  getCommands() {
    return this.COMMANDS;
  }

  handleMessage(command, parameter, msg) {
    let response = this.HELP_TEXT;
    return msg.channel.sendMessage(response);
  }
}

module.exports = Help;
