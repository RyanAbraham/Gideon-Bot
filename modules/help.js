/**
 * Responds with help for all commands
  */
import PREFIX from "./constants.js";

class Help {
  constructor() {
    this.commands = ["help"];
    this.helpText = `${PREFIX}card [cardname] -> Search for a card`
      + `\n${PREFIX}schedule -> Display the event schedule`
      + `\n${PREFIX}deck [deckurl] -> Display a deck`
      + `\n${PREFIX}hand [deckurl] -> Display sample hands of a deck`;
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
