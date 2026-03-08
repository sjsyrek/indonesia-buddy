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
      '7 phases per year: Turn Order → Mergers & Acquisitions → R&D → New Companies → Operations → City Growth → 3 Company Slots (Era A/B/C)',
      '3 eras: Era A (rounds 1-3), Era B (rounds 4-6), Era C (rounds 7-9)',
      'Game ends after round 9 (or when all companies are owned)',
    ],
  },
  {
    id: 'rd-tracks',
    title: 'R&D Tracks',
    content: [
      'Each level costs Rp 10 to advance',
      'Level 1: 1 company slot, no mergers, 1 expansion',
      'Level 2: 2 company slots, can propose mergers, 2 expansions',
      'Level 3: 3 company slots, hull upgrade (2 goods/ship), 3 expansions',
      'Level 4: 4 company slots, turn order bonus, 4 expansions',
      'Level 5: 5 company slots, maximum expansions (5)',
      'Turn order is determined by lowest R&D total (ties broken by earlier position)',
    ],
  },
  {
    id: 'company-types',
    title: 'Company Types',
    content: [
      'Shipping companies earn revenue from delivering goods to cities',
      'Production companies earn revenue per good delivered',
    ],
    table: {
      headers: ['Type', 'Base Price', 'Revenue'],
      rows: [
        ['Shipping', '10', '5/hop'],
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
      'If ALL goods were shipped last round → expand for FREE (up to R&D level)',
      'If NOT all goods shipped → must PAY Rp 10 per new area to expand',
      'You may choose not to expand (but shipping companies must always try to connect)',
      'Expansion limit = your R&D level (e.g., R&D 3 = up to 3 new areas)',
    ],
  },
  {
    id: 'shipping-costs',
    title: 'Shipping Costs',
    content: [
      'Cost = quantity × hops × Rp 5',
      'Shipping is MANDATORY — you must ship if a route exists, even at a loss',
      'The shipping company owner pays the shipping cost',
      'Production company owner receives full revenue regardless of shipping cost',
      'Break-even hops: Rice 4, Spice 5, Rubber 6, Siap Faji 7, Oil 8',
    ],
  },
  {
    id: 'city-growth',
    title: 'City Growth',
    content: [
      'Cities grow when ALL demand is satisfied in the City Growth phase',
      'Size progression: 1 → 2 → 3 → 4 (maximum)',
      'Size 1: needs 1 good of any type',
      'Size 2: needs 2 different goods',
      'Size 3: needs 3 different goods',
      'Size 4: maximum size, no further growth',
      '"Full demand" = every demand slot in the city was filled this round',
    ],
  },
  {
    id: 'merger-checklist',
    title: 'Merger Checklist',
    content: [
      'Requires R&D level 2+ to propose a merger',
      'Proposer must be involved in the merger (own one of the companies)',
      'Minimum bid = total units × base price per type',
      'Bid increments = total units (bids divisible by total units)',
      'Payment split is proportional to ownership units',
      'Winning bidder pays other owners; keeps their own share',
      'If no one outbids the proposer, merger happens at minimum bid',
    ],
  },
  {
    id: 'final-scoring',
    title: 'Final Scoring',
    content: [
      'Cash earned in the LAST round is doubled',
      'Total score = Bank money + Adjusted cash (with doubling)',
      'Bank money: accumulated from all rounds except company purchases',
      'Cash money: income from the final round only',
      'Highest total wins; ties broken by most cash (before doubling)',
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
      'FREE expansion: If every good your company produced was successfully shipped to a city, you may expand up to your R&D level for free. This rewards efficient logistics.',
      'PAID expansion: If any good was NOT shipped (left undelivered), you must pay Rp 10 per new area if you choose to expand. You can also decline to expand.',
      'Expansion limit is always capped by your R&D level. At R&D 1, you can add 1 area. At R&D 5, up to 5 areas.',
      'Shipping companies expand by placing new ships on sea routes. Production companies expand by placing new plantations/facilities on land.',
      'Example: You have Rice at R&D 3. You produced 4 rice but only shipped 3. You may expand up to 3 new areas, but each costs Rp 10 (total Rp 30). If all 4 had shipped, expansion would be free.',
    ],
  },
  {
    id: 'shipping-detailed',
    title: 'Shipping & Logistics',
    summary: 'Forced shipping losses, break-even analysis, who pays whom',
    details: [
      'Shipping is MANDATORY. If a route exists between a production company and a city with demand, goods MUST be shipped along that route.',
      'The shipping company owner pays ALL shipping costs (quantity × hops × 5). The production company owner receives full revenue. These can be different players!',
      'This means the shipping company owner can be forced into a loss if routes are long. This is a core strategic tension in the game.',
      'Break-even calculation: A good is profitable to ship if revenue per good > (hops × 5). Rice (Rp 20) breaks even at 4 hops. Oil (Rp 40) breaks even at 8 hops.',
      'When multiple shipping routes exist, the shipper with the shortest route has priority. If tied, the player earlier in turn order ships.',
      'Hull upgrade (R&D level 3): Each ship can carry 2 goods instead of 1, effectively halving your shipping cost per good.',
      'Strategy tip: Watch for opponents building long routes through your shipping network — they may force you into unprofitable deliveries.',
    ],
  },
  {
    id: 'merger-detailed',
    title: 'Merger Mechanics',
    summary: 'Cost formula, bid process, R&D requirements, step-by-step',
    details: [
      'Step 1 — PROPOSE: Any player with R&D 2+ can propose merging two companies of the same type. The proposer must own at least one of them.',
      'Step 2 — MINIMUM BID: Calculate total units (areas) of both companies combined. Minimum bid = total units × base price for that company type.',
      'Step 3 — BIDDING: Starting with the proposer, players bid in turn order. Bids must increase by at least the total units (the bid increment). Any player can bid, not just the owners.',
      'Step 4 — WINNER: Highest bidder wins. If the proposer\'s initial bid is not challenged, they win at minimum bid.',
      'Step 5 — PAYMENT: The winner pays each other owner proportionally. Payment to owner = (their units / total units) × winning bid. The winner keeps their own proportional share.',
      'Special case — Siap Faji: When creating a Siap Faji (merging Rice + Spice), the base price is 25. When merging two existing Siap Faji companies, the base price is 35.',
      'The merged company keeps all areas from both original companies. The winner controls the merged entity.',
    ],
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow Management',
    summary: 'Bankruptcy traps, reserve warnings, timing pitfalls',
    details: [
      'You can go bankrupt! If you cannot pay a mandatory cost, you lose the game. Always keep reserves.',
      'Mandatory costs include: shipping costs (forced), R&D investment (optional but strategic), expansion costs (when not all goods shipped), company acquisitions.',
      'Timing trap: Shipping costs are paid BEFORE you receive revenue. If you don\'t have enough cash to cover shipping, you\'re bankrupt even if revenue would have covered it.',
      'Reserve rule of thumb: Keep at least Rp 50 in reserve during mid-game. More if you own shipping companies with long routes.',
      'Company purchase costs come from your bank. Revenue goes to your cash. These are tracked separately for final scoring (cash is doubled in the last round).',
      'Mergers can be used strategically to drain opponents\' cash. Proposing a merger on a company an opponent needs forces them to bid high or lose it.',
    ],
  },
  {
    id: 'city-growth-detailed',
    title: 'City Growth Mechanics',
    summary: 'Size progression, demand slots, and what "full demand" means',
    details: [
      'City Growth happens AFTER Operations phase. Check each city: if ALL demand slots were filled this round, the city grows by 1 size.',
      'Size 1 city: Has 1 demand slot (any good type). Grows to size 2 if that slot was filled.',
      'Size 2 city: Has 2 demand slots (must be DIFFERENT good types). Grows to size 3 if both were filled.',
      'Size 3 city: Has 3 demand slots (all different types). Grows to size 4 if all three were filled.',
      'Size 4 city: Maximum size with 4 demand slots. Cannot grow further.',
      '"Full demand" means every demand slot in the city received a good this round. Partial fulfillment does NOT trigger growth.',
      'Strategy: Growing cities creates more demand, which benefits production companies. But it also requires more diverse supply chains.',
    ],
  },
  {
    id: 'rd-strategy',
    title: 'R&D Strategy',
    summary: 'Opportunity cost, level thresholds, when to invest',
    details: [
      'Each R&D level costs Rp 10. The investment is permanent and cannot be lost.',
      'Level 2 is critical: unlocks mergers and a second company slot. Most players should reach this by round 2-3.',
      'Level 3 is the power spike: hull upgrade (2 goods/ship) dramatically improves shipping efficiency. Also grants 3 company slots.',
      'Levels 4-5 are situational: more company slots and expansions matter most in the late game when many companies are available.',
      'Turn order consideration: Lower total R&D goes first. Sometimes staying at a lower level gives you turn order advantage, letting you grab key companies first.',
      'Opportunity cost: Every Rp 10 spent on R&D is Rp 10 not spent on company acquisitions or reserves. Balance growth against immediate needs.',
      'In Era A, focus on R&D 2-3. In Era B, evaluate whether R&D 4 is worth the turn order trade-off. In Era C, R&D rarely matters unless you need slots.',
    ],
  },
]
