# Indonesia Buddy

A calculator companion for the [Indonesia](https://boardgamegeek.com/boardgame/19777/indonesia) board game by Jeroen Doumen and Joris Wiersinga (Splotter Spellen).

**[Try it live](https://sjsyrek.github.io/indonesia-buddy/)**

Indonesia is a fantastic game with notoriously fiddly arithmetic. This app handles the math so you can focus on strategy.

## Features

### Merger Calculator

Mergers are where Indonesia gets brutal: bids must be exact multiples of the combined company size, and payments split proportionally between owners. With merged companies of 13 or 17 units, the mental math is painful.

- Select company type (Shipping, Rice, Spice, Rubber, Oil, Siap Faji)
- Set company sizes and owner names
- View a scrollable bid ladder with every valid bid
- Click any bid to see the exact payment split

### Shipping Calculator

Should you ship those goods across 6 hops or is that a guaranteed loss? This calculator tells you instantly.

- Select good type and quantity
- Set route length (number of hops)
- See gross revenue, shipping cost, and net profit/loss
- Break-even reference table for all good types

### Score Tracker

Track end-game scoring for 2–5 players.

- Enter bank and cash totals for each player
- Toggle final-round cash doubling per player
- Automatic ranking with winner highlighted

## Development

```bash
npm install
npm run dev        # Start dev server
npm test           # Run tests
npm run build      # Production build
```

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS v4
- Vite
- Vitest + React Testing Library

## License

MIT
