/**
 * Display a deck from a DeckStats URL
 */
const request = require("request");
const cheerio = require("cheerio");

class Deck {
  constructor() {
    this.COMMANDS = ["deck", "shuffle", "deal", "hand"];
    this.TIMEOUT = 2000;
  }

  getCommands() {
    return this.COMMANDS;
  }

  handleMessage(command, parameter, msg) {
    let response = "Invalid deck";
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
        let cards = []; // Element [0] is the amount and [1] is the card name
        let cardsExpanded = [];
        response = "";
        /* Fetch card quantities */
        var cardAmounts = $(".deck_overview_card_amount");
        for(var i=0; i<cardAmounts.length; i++){
          var element = cardAmounts.eq(i);
          cards.push([element.text().trim()]);
        }
        /* Fetch card names */
        var cardNames = $(".deck_overview_card_name");
        for(i=0; i<cardNames.length; i++){
          element = cardNames.eq(i);
          cards[i].push(element.text().trim());
        }
        /* Convert name + quantity into an array of names with duplicates */
        cards.forEach((card) => {
          for(i=0; i<card[0]; i++) {
            cardsExpanded.push(card[1]);
          }
        });
        // Generate several random hands from the deck as the response
        for(i=0; i<5; i++) {
          response += `Sample Hand ${i+1}: `;
          response += this.shuffle(cardsExpanded).slice(0,7).sort().join(" | ") + "\n";
        }
      } else {
        response = "Error fetching URL";
      }
      return msg.channel.sendMessage(response);
    });
  }

  // Knuth Shuffle algorithm
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

module.exports = Deck;
