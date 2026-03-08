# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project scaffolding: Vite + React 19 + TypeScript + Tailwind CSS v4 + Vitest
- TypeScript types for company types, players, merger inputs/results, shipping inputs/results
- Game constants module with base prices, revenue rates, and shipping cost per hop
- Merger math: minimum bid calculation, bid ladder generation, payment split
- Shipping math: revenue calculation, shipping cost, net profit, break-even analysis
- Comprehensive test suites for merger-math (14 tests) and shipping-math (14 tests)
