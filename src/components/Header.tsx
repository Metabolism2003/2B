import { ConnectButton } from 'thirdweb/react'
import { client } from '../lib/thirdwebClient'

export const Header = () => (
  <header
    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
  >
    <h1>DeFi PoC</h1>
    <ConnectButton client={client} />
  </header>
)

