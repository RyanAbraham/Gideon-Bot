/**
 * Logs game and tournament history for individual users
 */
class Log {
  constructor() {
    this.commands = ["log"];
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = "Unimplemented";
    return msg.channel.sendMessage(response);
  }
}

module.exports = Log;
