/**
 * Responds with help for all commands
  */
require("dotenv").config();
class Help {
  constructor() {
    this.commands = ["help"];
    this.helpText = `${process.env.PREFIX}card [cardname] -> Search for a card`
      + `\n${process.env.PREFIX}schedule -> Display the event schedule`
      + `\n${process.env.PREFIX}deck [deckurl] -> Display a deck`
      + `\n${process.env.PREFIX}hand [deckurl] -> Deal sample hands from a deck`;
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = this.helpText;
    return msg.channel.sendMessage(response);
  }
}

module.exports = Help;
