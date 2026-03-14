# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Score Tracker redesigned with three money inputs per player: Bank, Cash, and Earnings
- Final-round doubling replaced per-player checkboxes with a single global "Final round" toggle
- Earnings are the only value doubled in the final round; Bank and Cash are unaffected

## [1.0.0] - 2026-03-08

### Added

- Project scaffolding: Vite + React 19 + TypeScript + Tailwind CSS v4 + Vitest
- TypeScript types for company types, players, merger inputs/results, shipping inputs/results
- Game constants module with base prices, revenue rates, and shipping cost per hop
- Merger math: minimum bid calculation, bid ladder generation, payment split
- Shipping math: revenue calculation, shipping cost, net profit, break-even analysis
- Comprehensive test suites for merger-math (14 tests) and shipping-math (14 tests)
- Merger Calculator UI: company type selector, size/ownership inputs, bid ladder table, payment breakdown
- Shipping Calculator UI: good type/quantity/hops inputs, profit/loss display, break-even reference table
- Tab navigation between merger and shipping calculators with ARIA roles
- Component test suites for merger calculator (12 tests) and shipping calculator (16 tests)
- Score tracker: player setup (2-5), bank/cash inputs, final-round doubling, ranked results (21 tests)
- Score tracker tab in navigation
- Mobile-first responsive layout with touch-friendly targets (44x44px min)
- Game-themed visual design: amber/orange for merger, teal for shipping, emerald for scores
- Accessibility: aria-live regions, focus-visible indicators, semantic HTML sections
- Production build configured for GitHub Pages (base path /indonesia-buddy/)
- Rules Reference tab with Player Aid (quick reference) and Clarified Rules (detailed explanations)
- Player Aid: 8 scannable sections covering turn structure, R&D tracks, company types, expansion, shipping, city growth, mergers, scoring
- Clarified Rules: 6 collapsible sections with detailed explanations for expansion, shipping, mergers, cash flow, city growth, R&D strategy
- Typed rules content data layer (`rules-content.ts`) with validation tests
- Sky/blue color theme for Rules tab
- Shortened mobile tab labels ("Merger", "Shipping") for 4-tab layout
- Inter font for cohesive typography across the app
- SVG favicon (amber "IB" logo) and theme-color meta tag
- Tab panel fade-in animation with reduced-motion guard
- Phase stepper indicator (1. Setup → 2. Scoring) in score tracker
- Card wrapper for setup phase content in score tracker
- Scroll fade indicator on bid ladder table
- Dynamic "Net Profit" / "Net Loss" / "Break Even" labels on shipping results
- Profit/loss badge pills on shipping results
- Siap Faji helper text explaining Creation vs Merger
- `inputMode="numeric"` on all number inputs for better mobile keyboards
- `aria-live="polite"` on score tracker rankings list

### Changed

- Tab navigation expanded from 3 to 4 tabs (Merger, Shipping, Scores, Rules)
- App shell recolored from amber to neutral stone palette for cohesive identity
- Inactive tab buttons use stone neutrals instead of amber
- All card borders normalized to consistent `rounded-xl border-stone-200 shadow-sm` style
- Card spacing and padding standardized across all calculator components
- Table headers use consistent accent-colored backgrounds
- Score tracker recolored from green to emerald palette
- Score tracker "Start Scoring" button changed from yellow to emerald
- Score tracker "×2" indicator changed from yellow to amber
- Rules sub-tabs restyled as pill/segmented control to differentiate from main navigation
- Clarified rules disclosure triangles replaced with custom SVG chevrons

### Removed

- Empty `App.css` file

### Fixed

- Shipping payment direction: producer pays shipping costs from operating revenue; shippers receive Rp 5/cube (was reversed)
- R&D tracks: corrected to 5 separate tracks (Slots, Mergers, Expansion, Hull, Turn Order Bid) instead of 1 unified track
- R&D advancement is free (no Rp 10 cost)
- Turn order: determined by bidding with Turn Order Bid multiplier (not lowest R&D total)
- City max size: corrected to 3 (was incorrectly 4)
- City growth condition: requires N goods of every produced type (not N different goods)
- Era lengths: variable based on company availability (not fixed 3 rounds per era)
- Phase order: corrected 7-phase sequence (New Era → Turn Order Bid → Mergers → Acquisitions → R&D → Operations → City Growth)
- Free expansion is mandatory (not optional)
- Paid expansion costs base price per area per company type (not flat Rp 10)
- Merger bidders must own a company or have a free slot (not open to all players)
- Scoring tiebreaker: first in turn order (not most cash)
- Scoring pools: three pools (cash supply, bid stash, operating revenue) with correct descriptions
- Bankruptcy uses IOU system (not elimination)
- Shipping cost timing: revenue received first, then costs deducted
- Siap Saji creation: new owner must remove half (rounded up) of production areas
- Spelling: kept "Siap Faji" per official English rulebook (matches codebase types)
