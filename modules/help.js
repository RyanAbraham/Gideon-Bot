class Help {
  constructor() {
    this.commands = ["help"];
    this.helpText = "$card cardname -> Search for a card"
      + "\n$schedule -> Display the event schedule";
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
