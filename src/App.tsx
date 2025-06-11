import { useState } from 'react'
import { ThirdwebProvider } from 'thirdweb/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { TradeInput } from './components/TradeInput'
import { PriceTable } from './components/PriceTable'
import { Header } from './components/Header'
import { BuyButton } from './components/BuyButton'
import { useQuotes } from './hooks/useQuotes'

const queryClient = new QueryClient()

function InnerApp() {
  const [amount, setAmount] = useState(100)
  const { data = [], dataUpdatedAt } = useQuotes(amount)
  const best = data[0]

  return (
    <div>
      <Header />
      <TradeInput amount={amount} setAmount={setAmount} />
      <PriceTable data={data} updatedAt={dataUpdatedAt} />
      <BuyButton row={best} />
    </div>
  )
}

function App() {
  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </ThirdwebProvider>
  )
}

export default App

