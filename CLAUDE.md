# Indonesia Buddy

Calculator companion web app for the Indonesia board game (Splotter Spellen).

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **Deploy target**: Static SPA (GitHub Pages)

## Project Structure

```
src/
  lib/           — Pure game logic (no React dependencies)
    types.ts     — TypeScript interfaces and enums
    game-constants.ts — Base prices, revenue rates, etc.
    merger-math.ts    — Merger bid/payment calculations
    shipping-math.ts  — Shipping revenue/cost/profit calculations
  components/    — React UI components
  App.tsx        — Root component with tab navigation
```

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Type-check + production build
npm run test       # Run tests once
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
```

## Game Logic

All game math lives in `src/lib/` as pure functions with no side effects. This makes them easy to test and reuse.

### Merger Calculator
- Base prices per company type: Shipping 10, Rice 20, Spice 25, SiapFaji(create) 25, Rubber 30, SiapFaji(merge) 35, Oil 40
- Minimum bid = totalUnits × basePricePerType
- Bid increments = totalUnits (bids must be divisible by totalUnits)
- Payment split is proportional to ownership units

### Shipping Calculator
- Revenue per good: Rice 20, Spice 25, Rubber 30, SiapFaji 35, Oil 40
- Shipping cost = quantity × hops × 5
- Break-even hops = floor(revenuePerGood / 5)

## Conventions

- Follow parent CLAUDE.md for commit style, naming, TDD, etc.
- Components use Tailwind utility classes — minimal custom CSS
- Accessibility is mandatory (ARIA labels, keyboard nav, contrast)
- Mobile-first responsive design
