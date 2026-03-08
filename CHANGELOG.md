# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Rules Reference tab with Player Aid (quick reference) and Clarified Rules (detailed explanations)
- Player Aid: 8 scannable sections covering turn structure, R&D tracks, company types, expansion, shipping, city growth, mergers, scoring
- Clarified Rules: 6 collapsible sections with detailed explanations for expansion, shipping, mergers, cash flow, city growth, R&D strategy
- Typed rules content data layer (`rules-content.ts`) with validation tests
- Sky/blue color theme for Rules tab
- Shortened mobile tab labels ("Merger", "Shipping") for 4-tab layout

### Changed

- Tab navigation expanded from 3 to 4 tabs (Merger, Shipping, Scores, Rules)

### Previously Added

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
