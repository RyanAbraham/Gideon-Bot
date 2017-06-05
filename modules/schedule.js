/**
 * Display tournaments and events
 * Usage: schedule [Day/Location/Format]
 * Day      - Show events running on a specific day
 * Location - Show events running at a specific location
 * Format   - Show events of a certain format
 */
class Schedule {
  constructor() {
    this.COMMANDS = ["schedule"];
    this.DAYS = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday"
    ];
    this.FORMATS = [
      "standard",
      "modern",
      "legacy",
      "commander",
      "vintage"
    ];
    this.EVENTS = [
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
    return this.COMMANDS;
  }

  handleMessage(command, parameter, msg) {
    console.log(this.EVENTS);
    let response = "";
    let matchingEvents = [];
    // Find all events matching the search if there's any parameters
    if(parameter === "") {
      matchingEvents = this.EVENTS;
    } else {
      const searchTerm = parameter.toLowerCase();
      var key;
      if(this.DAYS.indexOf(searchTerm) > -1) {
        key = "day";
      } else if(this.FORMATS.indexOf(searchTerm) > -1){
        key = "format";
      } else {
        key = "location";
      }
      matchingEvents = this.EVENTS.filter(event => {
        return event[key].toLowerCase() === searchTerm;
      });
    }
    // If no events were found
    if(matchingEvents.length === 0) {
      response = "No events found!";
    } else {
      // Stringify each found event
      matchingEvents.forEach(event => {
        response += `${event["day"]} | ${event["location"]} | ${event["format"]}\n`;
      });
    }
    return msg.channel.sendMessage(response);
  }
}

module.exports = Schedule;
