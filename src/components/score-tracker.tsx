import { useState, useMemo } from 'react'

interface PlayerData {
  name: string
  bankMoney: number
  cashMoney: number
  isDoubleCash: boolean
}

type Phase = 'setup' | 'scoring'

function getOrdinal(n: number): string {
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

function calculateTotal(player: PlayerData): number {
  const cashAmount = player.isDoubleCash ? player.cashMoney * 2 : player.cashMoney
  return player.bankMoney + cashAmount
}

export function ScoreTracker() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [playerCount, setPlayerCount] = useState<number | null>(null)
  const [playerNames, setPlayerNames] = useState<string[]>([])
  const [players, setPlayers] = useState<PlayerData[]>([])

  const isSetup = phase === 'setup'

  function handlePlayerCountSelect(count: number) {
    setPlayerCount(count)
    setPlayerNames(Array.from({ length: count }, (_, i) => playerNames[i] ?? ''))
  }

  function handleNameChange(index: number, name: string) {
    setPlayerNames((prev) => {
      const next = [...prev]
      next[index] = name
      return next
    })
  }

  function handleStartScoring() {
    if (playerCount === null) return
    const initialPlayers: PlayerData[] = Array.from({ length: playerCount }, (_, i) => ({
      name: playerNames[i]?.trim() || `Player ${i + 1}`,
      bankMoney: 0,
      cashMoney: 0,
      isDoubleCash: false,
    }))
    setPlayers(initialPlayers)
    setPhase('scoring')
  }

  function handleEditPlayers() {
    setPhase('setup')
  }

  function updatePlayer(index: number, updates: Partial<PlayerData>) {
    setPlayers((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], ...updates }
      return next
    })
  }

  const rankedPlayers = useMemo(() => {
    return players
      .map((player, index) => ({ ...player, originalIndex: index }))
      .sort((a, b) => calculateTotal(b) - calculateTotal(a))
  }, [players])

  if (isSetup) {
    return (
      <article className="mx-auto max-w-2xl space-y-5 p-4">
        <h2 className="text-2xl font-bold text-emerald-900">Score Tracker</h2>

        <div className="mb-4 flex items-center justify-center gap-2 text-sm">
          <span className="font-bold text-emerald-700">1. Setup</span>
          <span className="text-stone-300">&rarr;</span>
          <span className="text-stone-400">2. Scoring</span>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold text-emerald-800">
              Number of Players
            </legend>
            <div className="flex gap-2" role="group" aria-label="Player count selection">
              {[2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountSelect(count)}
                  className={`rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    playerCount === count
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  aria-pressed={playerCount === count}
                >
                  {count} Players
                </button>
              ))}
            </div>
          </fieldset>

          {playerCount !== null && (
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-emerald-800">Player Names</h3>
              {Array.from({ length: playerCount }, (_, i) => (
                <div key={i}>
                  <label
                    htmlFor={`player-${i + 1}-name`}
                    className="mb-1 block text-sm font-medium text-emerald-700"
                  >
                    Player {i + 1} Name
                  </label>
                  <input
                    id={`player-${i + 1}-name`}
                    type="text"
                    value={playerNames[i] ?? ''}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleStartScoring}
                className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Start Scoring
              </button>
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-emerald-900">Score Tracker</h2>
        <button
          type="button"
          onClick={handleEditPlayers}
          className="rounded-lg bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Edit Players
        </button>
      </div>

      <div className="mb-4 flex items-center justify-center gap-2 text-sm">
        <span className="text-stone-400">1. Setup</span>
        <span className="text-stone-300">&rarr;</span>
        <span className="font-bold text-emerald-700">2. Scoring</span>
      </div>

      <div className="space-y-6">
        {players.map((player, index) => {
          const total = calculateTotal(player)
          return (
            <section
              key={index}
              className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm"
              aria-label={`${player.name} scoring`}
            >
              <h3 className="mb-3 text-lg font-bold text-emerald-800">{player.name}</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor={`${player.name.toLowerCase()}-bank`}
                    className="mb-1 block text-sm font-medium text-emerald-700"
                  >
                    {player.name} Bank
                  </label>
                  <input
                    id={`${player.name.toLowerCase()}-bank`}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={player.bankMoney || ''}
                    onChange={(e) =>
                      updatePlayer(index, { bankMoney: Number(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-lg font-semibold text-emerald-900 placeholder:text-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${player.name.toLowerCase()}-cash`}
                    className="mb-1 block text-sm font-medium text-emerald-700"
                  >
                    {player.name} Cash
                  </label>
                  <input
                    id={`${player.name.toLowerCase()}-cash`}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={player.cashMoney || ''}
                    onChange={(e) =>
                      updatePlayer(index, { cashMoney: Number(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-emerald-300 px-3 py-2 text-lg font-semibold text-emerald-900 placeholder:text-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`${player.name.toLowerCase()}-double`}
                  checked={player.isDoubleCash}
                  onChange={(e) =>
                    updatePlayer(index, { isDoubleCash: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                  aria-label={`Double cash for ${player.name}`}
                />
                <label
                  htmlFor={`${player.name.toLowerCase()}-double`}
                  className="text-sm font-medium text-emerald-700"
                >
                  Last round cash doubled?
                </label>
              </div>

              <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-center">
                <span className="text-sm text-emerald-600">Total</span>
                <p className="text-2xl font-bold text-emerald-900">
                  Rp {total}
                  {player.isDoubleCash && (
                    <span className="ml-2 text-sm font-normal text-amber-600">
                      (Cash ×2)
                    </span>
                  )}
                </p>
              </div>
            </section>
          )
        })}
      </div>

      {players.some((p) => p.bankMoney > 0 || p.cashMoney > 0) && (
        <section aria-label="Rankings" role="region" className="space-y-3">
          <h3 className="text-lg font-bold text-emerald-800">Rankings</h3>
          <ol className="space-y-2" aria-live="polite">
            {rankedPlayers.map((player, rank) => {
              const total = calculateTotal(player)
              const isWinner = rank === 0
              return (
                <li
                  key={player.originalIndex}
                  data-winner={isWinner ? 'true' : undefined}
                  className={`flex items-center justify-between rounded-lg p-3 ${
                    isWinner
                      ? 'border-2 border-yellow-400 bg-yellow-50 shadow-md'
                      : 'border border-emerald-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        isWinner
                          ? 'bg-yellow-400 text-yellow-900'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {getOrdinal(rank + 1)}
                    </span>
                    <span className={`font-semibold ${isWinner ? 'text-yellow-900' : 'text-emerald-800'}`}>
                      {player.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${isWinner ? 'text-yellow-900' : 'text-emerald-900'}`}>
                      Rp {total}
                    </p>
                    <p className="text-xs text-emerald-600">
                      Bank {player.bankMoney} + Cash {player.cashMoney}
                      {player.isDoubleCash && ' ×2'}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      )}
    </article>
  )
}
