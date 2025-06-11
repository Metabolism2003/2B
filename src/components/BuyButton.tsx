import { Web3Button, useContract } from 'thirdweb/react'
import { QuoteRow } from '../hooks/useQuotes'
import { ethers } from 'ethers'

const ROUTER_ADDRESS = '0x0000000000000000000000000000000000000000'
const WETH = '0x5300000000000000000000000000000000000004'

const abi = [
  'function swapVia0x(bytes calldata swapCalldata, address buyToken, uint256 minOut) external payable'
]

interface Props {
  row: QuoteRow | undefined
}

export const BuyButton = ({ row }: Props) => {
  const { contract } = useContract(ROUTER_ADDRESS, abi)

  if (!row) return null

  return (
    <Web3Button
      contract={contract}
      action={async (c) => {
        await c.call('swapVia0x', [row.data, WETH, BigInt(row.buyAmount)])
      }}
    >
      Buy
    </Web3Button>
  )
}

