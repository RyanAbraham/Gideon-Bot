class Card {
  constructor() {
    this.mtg = require("mtgsdk");
    this.timeout = 750;
    this.commands = ["card"];
    this.notFoundMessage = "Card not found!";
    this.apiurl = "https://api.magicthegathering.io/v1/cards";
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = this.notFoundMessage;
    let cards = [];
    // If no arguments, can't search for a card
    if(parameter === "") {
      response  = "Please specify a card!";
      return msg.channel.sendMessage(response);
    }
    cards = this.findCards(parameter);
    // Use timeout to wait for all the matching cards to be found
    setTimeout(() => {
      response = this.buildResponse(cards, parameter);
      return msg.channel.sendMessage(response);
    }, this.timeout);
  }

  findCards(searchTerm) {
    let cards = [];
    this.mtg.card.all({ name: searchTerm })
      .on("data", card => {
        // Add the card to the list of found cards only if the
        // image URL is valid and it's not already in the list
        var add = true;
        if(card.imageUrl === undefined) add = false;
        cards.forEach(existingCard => {
          if(existingCard.name === card.name) {
            add = false;
          }
        });
        if(add) cards.push(card);
      });
    return cards;
  }

  buildResponse(cards, searchTerm) {
    let closestCard = null;
    let response = "";
    if(cards === []) {
      return this.notFoundMessage;
    }
    // First loop: Find the closest matching card
    for(var card of cards) {
      if(card.name.toLowerCase() === searchTerm.toLowerCase()) {
        closestCard = card;
        break;
      }
    }
    if(closestCard === null && cards.length > 0) {
      closestCard = cards[0];
    }
    response += this.stringifyCard(closestCard);
    if(cards.length > 1) {
      response += "\n\nSimilar cards: ";
      let similarCards = [];
      // Second loop: Display similar cards found
      cards.forEach(card => {
        if(card !== closestCard) {
          similarCards.push(card.name);
        }
      });
      response += similarCards.join(" | ");
    }
    return response || this.notFoundMessage;
  }

  stringifyCard(card) {
    console.log(card);
    if(card === null) return "";
    let cardStr = "";
    cardStr += "**" + card.name + "**";
    if(card.manaCost !== undefined)
      cardStr += " — " + card.manaCost;
    cardStr += "\n" + card.type + "\n";
    cardStr += card.text + "\n";
    if(card.power !== undefined)
      cardStr += card.power + "/" + card.toughness + "\n";
    if(card.loyalty !== undefined)
      cardStr += "Starting loyalty: " + card.loyalty + "\n";
    cardStr += card.imageUrl;
    return cardStr;
  }
}

module.exports = Card;
