import { useState } from 'react'
import { MergerCalculator } from './components/merger-calculator'
import { ShippingCalculator } from './components/shipping-calculator'
import { ScoreTracker } from './components/score-tracker'
import { RulesPage } from './components/rules-page'

type Tab = 'merger' | 'shipping' | 'scores' | 'rules'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem('indonesia-buddy-tab')
    return saved && ['merger', 'shipping', 'scores', 'rules'].includes(saved)
      ? (saved as Tab)
      : 'merger'
  })

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    localStorage.setItem('indonesia-buddy-tab', tab)
  }

  return (
    <main className="min-h-screen bg-[#0d1421] px-3 py-4 sm:px-4 sm:py-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight text-amber-50 sm:text-3xl md:text-4xl">
          Indonesia Buddy
        </h1>
        <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
          Calculator companion for the Indonesia board game
        </p>
      </header>

      <nav className="mx-auto mt-4 max-w-2xl sm:mt-6" aria-label="Calculator tabs">
        <div className="flex rounded-lg bg-black/40 p-1" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'merger'}
            aria-controls="merger-panel"
            id="merger-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'merger'
                ? 'bg-[#1a2d4e] text-amber-300 shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
            onClick={() => switchTab('merger')}
          >
            <span className="sm:hidden">Merger</span>
            <span className="hidden sm:inline">Merger Calculator</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'shipping'}
            aria-controls="shipping-panel"
            id="shipping-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'shipping'
                ? 'bg-[#1a2d4e] text-teal-300 shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
            onClick={() => switchTab('shipping')}
          >
            <span className="sm:hidden">Shipping</span>
            <span className="hidden sm:inline">Shipping Calculator</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'scores'}
            aria-controls="scores-panel"
            id="scores-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'scores'
                ? 'bg-[#1a2d4e] text-emerald-300 shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
            onClick={() => switchTab('scores')}
          >
            Scores
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'rules'}
            aria-controls="rules-panel"
            id="rules-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'rules'
                ? 'bg-[#1a2d4e] text-sky-300 shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
            onClick={() => switchTab('rules')}
          >
            Rules
          </button>
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-2xl sm:mt-6">
        <div
          key={activeTab}
          className="tab-enter"
          role="tabpanel"
          id={`${activeTab}-panel`}
          aria-labelledby={`${activeTab}-tab`}
        >
          {activeTab === 'merger' && <MergerCalculator />}
          {activeTab === 'shipping' && <ShippingCalculator />}
          {activeTab === 'scores' && <ScoreTracker />}
          {activeTab === 'rules' && <RulesPage />}
        </div>
      </div>
    </main>
  )
}

export default App
