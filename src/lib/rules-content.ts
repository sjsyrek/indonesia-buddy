export interface PlayerAidSection {
  id: string
  title: string
  content: string[]
  table?: { headers: string[]; rows: string[][] }
}

export interface ClarifiedRuleSection {
  id: string
  title: string
  summary: string
  details: string[]
}

export const playerAidSections: PlayerAidSection[] = [
  {
    id: 'turn-structure',
    title: 'Turn Structure',
    content: [
      '7 phases per year: New Era (conditional) → Turn Order Bid → Mergers → Acquisitions → R&D → Operations → City Growth',
      'A new era begins when no unclaimed company deeds remain, or only one type is left. Era length varies — no fixed round count.',
      'Game ends during Era C when the same condition is met (no deeds left or only one type).',
    ],
  },
  {
    id: 'rd-tracks',
    title: 'R&D Tracks',
    content: [
      '5 separate tracks — advance ONE track, ONE step per year (free, no cost):',
      'Slots: max companies you may own (1–5)',
      'Mergers: max deeds in a single merger (1–5)',
      'Expansion: areas you can add per operation (1–5)',
      'Hull: goods each ship can carry (1–3). Any player may advance another player\'s Hull!',
      'Turn Order Bid: multiplier for your turn order bid (×1–×5). Effective bid = cash × multiplier. Highest goes first.',
    ],
  },
  {
    id: 'company-types',
    title: 'Company Types',
    content: [
      'Shipping companies receive Rp 5 per cargo cube placed on their ships',
      'Production companies earn revenue per good delivered to a city',
    ],
    table: {
      headers: ['Type', 'Base Price', 'Revenue'],
      rows: [
        ['Shipping', '10', '5/cargo cube'],
        ['Rice', '20', '20/good'],
        ['Spice', '25', '25/good'],
        ['Rubber', '30', '30/good'],
        ['Siap Faji', '25 (create) / 35 (merge)', '35/good'],
        ['Oil', '40', '40/good'],
      ],
    },
  },
  {
    id: 'expansion-rules',
    title: 'Expansion Rules',
    content: [
      'If ALL goods were shipped → company MUST expand for free (up to Expansion R&D level)',
      'If NOT all goods shipped → may PAY base price per new area to expand (optional)',
      'Expansion limit = your Expansion R&D track level',
      'Paid expansion cost = base price per area (see Company Types table: Rice Rp 20, Spice Rp 25, Rubber Rp 30, Siap Faji Rp 25, Oil Rp 40)',
    ],
  },
  {
    id: 'shipping-costs',
    title: 'Shipping Costs',
    content: [
      'Shipping cost = total cargo cubes used × Rp 5 (each good uses 1 cube per ship it passes through)',
      'Paid by the PRODUCTION company owner from operating revenue. Revenue is received first, then costs deducted.',
      'Shipping company owners RECEIVE Rp 5 per cargo cube on their ships — shippers earn, producers pay',
      'Shipping is MANDATORY — you must ship if a route exists, even at a loss',
      'Break-even hops (for producer): Rice 4, Spice 5, Rubber 6, Siap Faji 7, Oil 8',
    ],
  },
  {
    id: 'city-growth',
    title: 'City Growth',
    content: [
      'City Growth phase: after Operations, check each size-1 and size-2 city. Grow size 2 → 3 first, then size 1 → 2.',
      'A city grows when it received its size in goods of EVERY type currently produced on the board',
      'Size progression: 1 → 2 → 3 (maximum). Only size 1 and size 2 cities can grow.',
      'Size 1: needs 1 good of every produced type to grow',
      'Size 2: needs 2 goods of every produced type to grow',
      'Size 3: maximum size — cannot grow further',
    ],
  },
  {
    id: 'merger-checklist',
    title: 'Merger Checklist',
    content: [
      'Requires Mergers R&D ≥ total deeds in the merged company (minimum 2)',
      'Proposer must be able to bid: own one of the companies OR have a free company slot',
      'Minimum bid = total units × base price per type',
      'Bid increments = total units (bids divisible by total units)',
      'To bid, a player must own one of the companies OR have a free company slot (Slots R&D > current company count)',
      'Winning bidder pays other owners proportionally; keeps their own share',
      'Siap Faji creation: new owner must REMOVE half (rounded up) of production areas (border areas only)',
    ],
  },
  {
    id: 'final-scoring',
    title: 'Final Scoring',
    content: [
      'Operating revenue from the LAST year is DOUBLED before adding to your total',
      'Total score = cash supply + turn order bid stash + doubled operating revenue',
      'Cash supply: spendable money accumulated across all years',
      'Turn order bid stash: all money ever spent on turn order bids (set aside permanently, counts at end)',
      'Operating revenue: income from the final year (doubled)',
      'Tiebreaker: player first in turn order wins',
      'If you cannot pay a cost, take IOUs (negative value at game end) — no elimination',
    ],
  },
]

export const clarifiedRuleSections: ClarifiedRuleSection[] = [
  {
    id: 'expansion-detailed',
    title: 'Expansion Rules',
    summary: 'When expansion is free vs paid, and how limits work',
    details: [
      'Expansion happens during the Operations phase, after all shipping is resolved.',
      'FREE expansion: If every good your company produced was successfully shipped to a city, the company MUST expand for free. You add areas equal to your Expansion R&D level (mandatory, not optional).',
      'PAID expansion: If any good was NOT shipped (left undelivered), you may choose to pay the company\'s base price per new area to expand. You can also decline to expand.',
      'Expansion limit is always capped by your Expansion R&D track level. At level 1, you can add 1 area. At level 5, up to 5 areas.',
      'Shipping companies expand by placing new ships on sea routes. Production companies expand by placing new plantations/facilities on land.',
      'Example: You have Rice (base price Rp 20) at Expansion R&D 3. You produced 4 rice but only shipped 3. You may expand up to 3 new areas, each costing Rp 20 (total Rp 60). If all 4 had shipped, expansion would be free but mandatory.',
    ],
  },
  {
    id: 'shipping-detailed',
    title: 'Shipping & Logistics',
    summary: 'Who pays whom, forced shipping, break-even analysis',
    details: [
      'Shipping is MANDATORY. If a route exists between a production company and a city with demand, goods MUST be shipped along that route.',
      'The PRODUCTION company owner pays shipping costs from their operating revenue. Shipping company owners RECEIVE Rp 5 per cargo cube placed on their ships. These can be different players!',
      'This means the production company owner can be forced into a loss if routes are long. This is a core strategic tension in the game.',
      'Break-even calculation: A good is profitable for the producer if revenue per good > (hops × 5). Rice (Rp 20) breaks even at 4 hops. Oil (Rp 40) breaks even at 8 hops.',
      'When multiple shipping routes exist, the production company\'s owner chooses which route to use. Shortest route is usually preferred to minimize cost.',
      'Hull R&D track: Increasing Hull lets each ship carry more goods (up to 3), reducing total shipping cost since fewer cargo cubes are needed along the route.',
      'Strategy tip: Watch for opponents routing goods through long paths via your production companies — they profit from shipping while you pay the cost.',
    ],
  },
  {
    id: 'merger-detailed',
    title: 'Merger Mechanics',
    summary: 'Cost formula, bid process, R&D requirements, step-by-step',
    details: [
      'Step 1 — PROPOSE: Any player with sufficient Mergers R&D can propose merging two companies of the same type (or Rice + Spice to create Siap Faji). The proposer must be able to bid (own one of the companies OR have a free slot).',
      'Step 2 — MINIMUM BID: Calculate total units (areas) of both companies combined. Minimum bid = total units × base price for that company type.',
      'Step 3 — BIDDING: Starting with the proposer, players bid in turn order. Bids must increase by at least the total units (the bid increment). To bid, you must own one of the companies OR have a free company slot.',
      'Step 4 — WINNER: Highest bidder wins. If the proposer\'s initial bid is not challenged, they win at minimum bid.',
      'Step 5 — PAYMENT: The winner pays each other owner proportionally. Payment to owner = (their units / total units) × winning bid. The winner keeps their own proportional share.',
      'Special case — Siap Faji: When creating Siap Faji (merging Rice + Spice), the base price is 25. The new owner must REMOVE half (rounded up) of the production areas, then replace remaining rice/spice with Siap Faji.',
      'When merging two existing Siap Faji companies, the base price is 35. No areas are removed in this case.',
    ],
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow Management',
    summary: 'Money pools, IOUs, reserve warnings, timing',
    details: [
      'Three money pools: cash supply (spendable), turn order bid stash (set aside permanently), and operating revenue (current year\'s income).',
      'At year-end, operating revenue moves to your cash supply. At game-end, final operating revenue is DOUBLED before scoring.',
      'Revenue timing: The bank pays you production revenue, then you pay shipping costs from that operating revenue. Revenue comes first.',
      'If you cannot pay a mandatory cost, you take IOUs. IOUs count as negative value at game end. You are NOT eliminated.',
      'Mandatory costs include: shipping costs (forced), expansion costs (when paying for expansion), company acquisitions.',
      'R&D advancement is FREE — it costs no money, only the opportunity of advancing one track per year.',
      'Mergers can be used strategically to drain opponents\' cash. Proposing a merger on a company an opponent needs forces them to bid high or lose it.',
    ],
  },
  {
    id: 'city-growth-detailed',
    title: 'City Growth Mechanics',
    summary: 'Size progression, growth conditions, what counts',
    details: [
      'City Growth happens AFTER the Operations phase. First grow size-2 cities to size 3, then grow size-1 cities to size 2.',
      'Growth condition: A city must have received its SIZE in goods of EVERY type currently produced anywhere on the board. If no goods are produced at all, all size-1 and size-2 cities grow.',
      'Size 1 city: Needs 1 good of every produced type. If rice, spice, and rubber are all being produced on the board, it needs 1 rice + 1 spice + 1 rubber to grow.',
      'Size 2 city: Needs 2 goods of every produced type. Much harder — requires 2 rice + 2 spice + 2 rubber (etc.).',
      'Size 3 city: Maximum size. Cannot grow further. Still demands goods but growth stops.',
      'This means introducing a new company type (e.g., rubber) makes ALL cities harder to grow, since they now need that type too.',
      'Strategy: City growth creates more demand slots, benefiting producers. But the growth condition is demanding — it requires broad supply chains.',
    ],
  },
  {
    id: 'rd-strategy',
    title: 'R&D Strategy',
    summary: 'Five tracks, opportunity cost, when to advance each',
    details: [
      'R&D is FREE to advance — no monetary cost. You advance one track, one step per year. The cost is purely opportunity cost.',
      'Slots track is often first priority: you need slots to acquire or win mergers for additional companies.',
      'Mergers track at level 2+: required to propose mergers. Higher levels let you merge larger companies.',
      'Expansion track: directly controls how many areas you can add per operation. Critical for production companies.',
      'Hull track: each level adds carrying capacity to ALL ships. Uniquely, any player can advance another player\'s Hull track. Useful for cooperative shipping strategies.',
      'Turn Order Bid track: multiplies your bid when competing for turn order. Higher multiplier = more influence on position with less cash spent.',
      'Key trade-off: you only get one advance per year across all 5 tracks. Prioritize based on your current companies and strategy.',
    ],
  },
]
