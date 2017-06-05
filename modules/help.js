/**
 * Responds with help for all commands
 */
require("dotenv").config();
const PFX = process.env.PREFIX;
class Help {
  constructor() {
    this.COMMANDS = ["help"];
    this.HELP_TEXT = `${PFX}card [cardname] -> Search for a card`
      + `\n${PFX}schedule -> Display the event schedule`
      + `\n${PFX}deck [deckurl] -> Deal sample hands from a deck`
      + `\n${PFX}log (deck) {(wins) (losses) (opp deck)} -> Record a tournament`;
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
