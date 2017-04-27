const request = require("request");
const cheerio = require("cheerio");

class Deck {
  constructor() {
    this.commands = ["deck"];
    this.timeout = 2000;
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = "Deck placeholder text";
    if(parameter === "") {
      response = "Please specify a deck URL!";
      return msg.channel.sendMessage(response);
    } else if(parameter.toLowerCase().indexOf("deckstats.net/deck") < 0) {
      response = "Only deck URLs from DeckStats are accepted!";
      return msg.channel.sendMessage(response);
    }
    request(parameter, (error, reqResponse, html) => {
      if(!error) {
        let $ = cheerio.load(html);
        $(".cardlink").each((index) => {
          response = index + ": " + $(this).text();
        });
      } else {
        response = "Error fetching URL";
      }
      return msg.channel.sendMessage(response);
    });
    // Use timeout to wait for all the matching cards to be found
    //setTimeout(() => {
    //}, this.timeout);
  }
}

module.exports = Deck;
