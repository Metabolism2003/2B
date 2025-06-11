import { TransactionButton } from 'thirdweb/react'
import { prepareContractCall, getContract } from 'thirdweb'
import { sepolia } from 'thirdweb/chains'
import { client } from '../lib/thirdwebClient'

  const contract = getContract({ client, chain: sepolia, address: ROUTER_ADDRESS, abi })

    <TransactionButton
      client={client}
      transaction={() =>
        prepareContractCall({
          contract,
          method: 'swapVia0x',
          params: [row.data, WETH, BigInt(row.buyAmount)],
        })
      }
    </TransactionButton>
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
      action={async (c: any) => {

        await c.call('swapVia0x', [row.data, WETH, BigInt(row.buyAmount)])
      }}
    >
      Buy
    </Web3Button>
  )
}

