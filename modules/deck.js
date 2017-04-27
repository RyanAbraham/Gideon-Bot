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
        let cards = [];
        response = "";
        // Fetch card quantities
        var cardAmounts = $(".deck_overview_card_amount");
        for(var i=0; i<cardAmounts.length; i++){
          var element = cardAmounts.eq(i);
          cards.push([element.text().trim()]);
        }
        // Fetch card names
        var cardNames = $(".deck_overview_card_name");
        for(i=0; i<cardNames.length; i++){
          element = cardNames.eq(i);
          cards[i].push(element.text().trim());
        }
        // Build a visualization of the deck as the response
        cards.sort().reverse().forEach((card) => {
          response += card[0] + "x " + card[1] + "\n";
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
