import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface QuoteRow {
  dex: string
  price: number
  lpFee: number
  gasUsd: number
  total: number
  data: string
  buyAmount: string
}

const ETH_USD = 2000

const DEXES = [
  'Uniswap_V3',
  'Uniswap_V2',
  'SushiSwap',
  'Balancer_V2',
  'Curve'
]

const fetchQuoteForDex = async (amount: number, dex: string): Promise<QuoteRow | null> => {
  const sellAmount = BigInt(Math.floor(amount * 1e6))
  const url = 'https://sepolia.api.0x.org/swap/v1/quote'

  try {
    const res = await axios.get(url, {
      params: {
        sellToken: 'USDC',
        buyToken: 'WETH',
        sellAmount: sellAmount.toString(),
        includedSources: dex
      }
    })

    const q = res.data
    const gasUsd = (Number(q.gas) * Number(q.gasPrice)) / 1e18 * ETH_USD
    return {
      dex,
      price: Number(q.price),
      lpFee: 0,
      gasUsd,
      total: Number(q.sellAmount) / 1e6 + gasUsd,
      data: q.data,
      buyAmount: q.buyAmount
    }
  } catch {
    return null
  }
}

export const useQuotes = (amount: number) => {
  return useQuery({
    queryKey: ['quotes', amount],
    queryFn: async () => {
      const rows = await Promise.all(
        DEXES.map((d) => fetchQuoteForDex(amount, d))
      )
      const list = rows.filter(Boolean) as QuoteRow[]
      return list.sort((a, b) => a.total - b.total).slice(0, 5)
    },
    refetchInterval: 30000
  })
}

