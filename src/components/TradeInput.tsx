import { Dispatch, SetStateAction } from 'react'

interface Props {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}

export const TradeInput = ({ amount, setAmount }: Props) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Sell Amount (USDC): </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        min={0}
      />
    </div>
  )
}

