class Schedule {
  constructor() {
    this.commands = ["schedule"];
    this.days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    this.formats = [
      "standard",
      "modern",
      "legacy",
      "commander",
      "vintage"
    ];
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
    console.log(this.eventList);
    let response = "";
    let matchingEvents = [];
    // Find all events matching the search if there's any parameters
    if(parameter === "") {
      matchingEvents = this.eventList;
    } else {
      const searchTerm = parameter.toLowerCase();
      var key;
      if(this.days.indexOf(searchTerm) > -1) {
        key = "day";
      } else if(this.formats.indexOf(searchTerm) > -1){
        key = "format";
      } else {
        key = "location";
      }
      matchingEvents = this.eventList.filter(event => {
        return event[key].toLowerCase() === searchTerm;
      });
    }
    // If no events were found
    if(matchingEvents.length === 0) {
      response = "No events found!";
    } else {
      // Stringify each found event
      matchingEvents.forEach(event => {
        response += event["day"] + " | " + event["location"] + " | " + event["format"] + "\n";
      });
    }
    return msg.channel.sendMessage(response);
  }
}

module.exports = Schedule;
