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

      <div
        className="flex rounded-lg bg-sky-100/60 p-1"
        role="tablist"
        aria-label="Rules view"
      >
        <button
          role="tab"
          aria-selected={view === 'aid'}
          aria-controls="aid-panel"
          id="aid-tab"
          className={`min-h-[40px] flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:text-base ${
            view === 'aid'
              ? 'bg-white text-sky-900 shadow-sm'
              : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
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
          className={`min-h-[40px] flex-1 rounded-md px-3 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:text-base ${
            view === 'clarified'
              ? 'bg-white text-sky-900 shadow-sm'
              : 'text-sky-700 hover:bg-sky-50 hover:text-sky-900'
          }`}
          onClick={() => setView('clarified')}
        >
          Clarified Rules
        </button>
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
