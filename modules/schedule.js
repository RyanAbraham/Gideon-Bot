class Schedule {
  constructor() {
    this.commands = ["schedule"];
    this.eventList = [
      { day: "Tuesday",   location: "Carta Magica",   format: "Modern" },
      { day: "Wednesday", location: "Wizard's Tower", format: "Modern" },
      { day: "Wednesday", location: "Gaming Kingdom", format: "Modern" },
      { day: "Thursday",  location: "Gaming Kingdom", format: "Commander" },
      { day: "Thursday",  location: "Wizard's Tower", format: "Standard" },
      { day: "Friday",    location: "Wizard's Tower", format: "Standard" },
      { day: "Friday",    location: "Gamebreakers",   format: "Modern" }
    ];
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = "";
    this.eventList.forEach(event => {
      response += event["day"] + " " + event["location"] + " " + event["format"] + "\n";
    });
    return msg.channel.sendMessage(response);
  }
}

module.exports = Schedule;
