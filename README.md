# Introduction
Gideon Bot is a Discord bot for any MTG related servers. Card fetching, deck goldfishing, and tournament schedules are all currently supported!

# Setup
1. Download or clone this repository.
2. CD into the project directory.
3. Create a .env file and add the following lines to it:
```
PREFIX="$"
BOT_TOKEN="YourBotTokenGoesHere"
```
4. Run the following commands:
```
npm install
node server.js
```

# Features
## Card Fetching
Fetches card images, stats, and similar card names from a card name input
```
$card <cardname>
Ex: $card Black Lotus
```

## Scheduler
Fetches event dates, formats, and locations. Support for custom events coming soon!
```
$schedule <day|format|location>
Ex: $schedule Wizard's Tower
```

## Deck Goldfishing
Deals up sample hands from a deck hosted on DeckStats. Support for other deck sites coming soon!
```
$deck <deckURL>
Ex: $deck https://deckstats.net/decks/67441/517093-34-rhinos/en
```
