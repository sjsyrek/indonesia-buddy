import { useState } from 'react'
import './App.css'
import { MergerCalculator } from './components/merger-calculator'
import { ShippingCalculator } from './components/shipping-calculator'

type Tab = 'merger' | 'shipping'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('merger')

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 px-3 py-4 sm:px-4 sm:py-6">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl md:text-4xl">
          Indonesia Buddy
        </h1>
        <p className="mt-1 text-sm text-amber-800 sm:mt-2 sm:text-base">
          Calculator companion for the Indonesia board game
        </p>
      </header>

      <nav className="mx-auto mt-4 max-w-2xl sm:mt-6" aria-label="Calculator tabs">
        <div className="flex rounded-lg bg-amber-200/60 p-1" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'merger'}
            aria-controls="merger-panel"
            id="merger-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'merger'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-amber-700 hover:bg-amber-100/60 hover:text-amber-900'
            }`}
            onClick={() => setActiveTab('merger')}
          >
            Merger Calculator
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'shipping'}
            aria-controls="shipping-panel"
            id="shipping-tab"
            className={`min-h-[44px] flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:px-4 sm:text-base ${
              activeTab === 'shipping'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-amber-700 hover:bg-amber-100/60 hover:text-amber-900'
            }`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Calculator
          </button>
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-2xl sm:mt-6">
        <div
          role="tabpanel"
          id="merger-panel"
          aria-labelledby="merger-tab"
          hidden={activeTab !== 'merger'}
        >
          {activeTab === 'merger' && <MergerCalculator />}
        </div>
        <div
          role="tabpanel"
          id="shipping-panel"
          aria-labelledby="shipping-tab"
          hidden={activeTab !== 'shipping'}
        >
          {activeTab === 'shipping' && <ShippingCalculator />}
        </div>
      </div>
    </main>
  )
}

export default App
