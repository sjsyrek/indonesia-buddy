import { useState } from 'react'
import './App.css'
import { MergerCalculator } from './components/merger-calculator'
import { ShippingCalculator } from './components/shipping-calculator'

type Tab = 'merger' | 'shipping'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('merger')

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Indonesia Buddy</h1>
        <p className="mt-2 text-gray-600">
          Calculator companion for the Indonesia board game
        </p>
      </header>

      <nav className="mx-auto mt-6 max-w-2xl" aria-label="Calculator tabs">
        <div className="flex border-b border-gray-200" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'merger'}
            aria-controls="merger-panel"
            id="merger-tab"
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
              activeTab === 'merger'
                ? 'border-b-2 border-amber-600 text-amber-700'
                : 'text-gray-500 hover:text-gray-700'
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
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              activeTab === 'shipping'
                ? 'border-b-2 border-teal-600 text-teal-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Calculator
          </button>
        </div>
      </nav>

      <div className="mx-auto mt-4 max-w-2xl">
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
