/**
 * Logs game and tournament history for individual users
 */
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("users.db");
class Log {
  constructor() {
    this.COMMANDS = ["log", "record"];
  }

  getCommands() {
    return this.COMMANDS;
  }

  handleMessage(command, parameter, msg) {
    let response = "Unimplemented";

    const parameters = parameter.split(" ");
    if(parameters.length % 3 != 0) {
      return msg.channel.sendMessage("Invalid number of arguments! "
        +"Use the help command for more details.");
    }

    // Insert sample tournament into the database
    db.serialize(function() {
      db.run("INSERT INTO Tournaments(user_id, deck)"
           + "VALUES (1, 'Affinity')");
    });

    db.close();

    return msg.channel.sendMessage(response);
  }
}

module.exports = Log;
