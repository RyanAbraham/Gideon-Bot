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
    var matchingEvents;
    // Find all events matching the search if there's any parameters
    if(parameter === "") {
      matchingEvents = this.eventList;
    } else {
      const searchTerm = parameter.toLowerCase();
      matchingEvents = this.eventList.filter(event => {
        return event["day"].toLowerCase() === searchTerm;
      });
    }
    // If no events were found
    if(matchingEvents === []) {
      response = "No events found!";
    } else {
      // Stringify each found event
      matchingEvents.forEach(event => {
        response += event["day"] + " | " + event["location"] + " | " + event["format"] + "\n";
      });
    }
    console.log(matchingEvents);
    return msg.channel.sendMessage(response);
  }
}

module.exports = Schedule;
