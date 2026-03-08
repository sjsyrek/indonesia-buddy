import { useState } from 'react'
import { PlayerAid } from './player-aid'
import { ClarifiedRules } from './clarified-rules'

type RulesView = 'aid' | 'clarified'

export function RulesPage() {
  const [view, setView] = useState<RulesView>('aid')

  return (
    <article
      aria-label="Rules reference"
      className="space-y-4 rounded-xl border border-sky-200 bg-white p-3 shadow-md sm:space-y-6 sm:p-5"
    >
      <h2 className="text-xl font-bold text-sky-900 sm:text-2xl">
        Rules Reference
      </h2>

      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full border border-stone-300 p-0.5"
          role="tablist"
          aria-label="Rules view"
        >
          <button
            role="tab"
            aria-selected={view === 'aid'}
            aria-controls="aid-panel"
            id="aid-tab"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:text-sm ${
              view === 'aid'
                ? 'bg-sky-600 text-white'
                : 'text-stone-600 hover:text-stone-700'
            }`}
            onClick={() => setView('aid')}
          >
            Player Aid
          </button>
          <button
            role="tab"
            aria-selected={view === 'clarified'}
            aria-controls="clarified-panel"
            id="clarified-tab"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:text-sm ${
              view === 'clarified'
                ? 'bg-sky-600 text-white'
                : 'text-stone-600 hover:text-stone-700'
            }`}
            onClick={() => setView('clarified')}
          >
            Clarified Rules
          </button>
        </div>
      </div>

      <div
        role="tabpanel"
        id="aid-panel"
        aria-labelledby="aid-tab"
        hidden={view !== 'aid'}
      >
        {view === 'aid' && <PlayerAid />}
      </div>
      <div
        role="tabpanel"
        id="clarified-panel"
        aria-labelledby="clarified-tab"
        hidden={view !== 'clarified'}
      >
        {view === 'clarified' && <ClarifiedRules />}
      </div>
    </article>
  )
}
