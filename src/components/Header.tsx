import { ConnectWallet } from 'thirdweb/react'

export const Header = () => (
  <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <h1>DeFi PoC</h1>
    <ConnectWallet />
  </header>
)

