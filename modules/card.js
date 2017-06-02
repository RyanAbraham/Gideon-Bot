/**
 * Fetches a card based on requested card name
 */
const mtg = require("mtgsdk");

class Card {
  constructor() {
    this.commands = ["card"];
    this.timeout = 750;
    this.notFoundMsg = "Card not found!";
    this.apiurl = "https://api.magicthegathering.io/v1/cards";
  }

  getCommands() {
    return this.commands;
  }

  handleMessage(command, parameter, msg) {
    let response = this.notFoundMsg;
    let cards = [];
    if(parameter === "") {
      response  = "Please specify a card!";
      return msg.channel.sendMessage(response);
    }
    // If no arguments, can't search for a card
    cards = this.findCards(parameter);
    // Use timeout to wait for all the matching cards to be found
    setTimeout(() => {
      response = this.buildResponse(cards, parameter);
      return msg.channel.sendMessage(response);
    }, this.timeout);
  }

  findCards(searchTerm) {
    let cards = [];
    mtg.card.all({ name: searchTerm }).on("data", card => {
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
    let matchedCard = null;
    let closestCard = null;
    let response = "";
    if(cards === []) {
      return this.notFoundMsg;
    }
    // First loop: See if any cards match the search exactly
    for(var card of cards) {
      if(card.name.toLowerCase() === searchTerm.toLowerCase()) {
        // Found an exact match
        matchedCard = card;
        break;
      } else if(closestCard === null) {
        card.name.toLowerCase().split(" ").forEach(word => {
          // Found a close match
          if(searchTerm === word) {
            closestCard = card;
          }
        });
      }
    }
    if(matchedCard === null && cards.length > 0) {
      // No exact match was found, so choose the closest one
      if(closestCard !== null) {
        // A card partially matching was found, so return that
        matchedCard = closestCard;
      } else {
        // No close matches, so return the first found card
        matchedCard = cards[0];
      }
    }
    response += this.stringifyCard(matchedCard);
    if(cards.length > 1) {
      response += "\n\nSimilar cards: ";
      let similarCards = [];
      // Second loop: Display similar cards found
      cards.forEach(card => {
        if(card !== matchedCard) {
          similarCards.push(card.name);
        }
      });
      response += similarCards.join(" | ");
    }
    return response || this.notFoundMsg;
  }

  stringifyCard(card) {
    if(card === null) return "";
    let cardStr = "";
    cardStr += `**${card.name}**`;
    if(card.manaCost !== undefined)
      cardStr += ` — ${card.manaCost}`;
    cardStr += `\n${card.type}\n`;
    if(card.text !== undefined)
      cardStr += `${card.text}\n`;
    if(card.power !== undefined)
      cardStr += `${card.power} :dagger: / ${card.toughness} :shield:\n`;
    if(card.loyalty !== undefined)
      cardStr += `Starting loyalty: ${card.loyalty}\n`;
    cardStr += card.imageUrl;
    return cardStr;
  }
}

module.exports = Card;
