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
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 px-3 py-4 sm:px-4 sm:py-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
          Indonesia Buddy
        </h1>
        <p className="mt-1 text-sm text-stone-500 sm:mt-2 sm:text-base">
          Calculator companion for the Indonesia board game
        </p>
      </header>

      <nav className="mx-auto mt-4 max-w-2xl sm:mt-6" aria-label="Calculator tabs">
        <div className="flex rounded-lg bg-stone-200/60 p-1" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'merger'}
            aria-controls="merger-panel"
            id="merger-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'merger'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
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
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
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
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
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
                ? 'bg-white text-sky-900 shadow-sm'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
            }`}
            onClick={() => switchTab('rules')}
          >
            Rules
          </button>
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-2xl sm:mt-6">
        <div role="tabpanel" id="merger-panel" aria-labelledby="merger-tab" hidden={activeTab !== 'merger'}>
          <MergerCalculator />
        </div>
        <div role="tabpanel" id="shipping-panel" aria-labelledby="shipping-tab" hidden={activeTab !== 'shipping'}>
          <ShippingCalculator />
        </div>
        <div role="tabpanel" id="scores-panel" aria-labelledby="scores-tab" hidden={activeTab !== 'scores'}>
          <ScoreTracker />
        </div>
        <div role="tabpanel" id="rules-panel" aria-labelledby="rules-tab" hidden={activeTab !== 'rules'}>
          <RulesPage />
        </div>
      </div>
    </main>
  )
}

export default App
