import type { QuoteRow } from '../hooks/useQuotes'

interface Props {
  data: QuoteRow[]
  updatedAt: number | undefined
}

export const PriceTable = ({ data, updatedAt }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>DEX</th>
          <th>Exec Price</th>
          <th>LP Fee (bp)</th>
          <th>Gas USD</th>
          <th>Total USDC</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.dex}>
            <td>{r.dex}</td>
            <td>{r.price.toFixed(6)}</td>
            <td>{r.lpFee.toFixed(2)}</td>
            <td>{r.gasUsd.toFixed(2)}</td>
            <td>{r.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      {updatedAt && (
        <tfoot>
          <tr>
            <td colSpan={5} style={{ textAlign: 'right' }}>
              updated {Math.floor((Date.now() - updatedAt) / 1000)}s ago
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}

