import React from 'react';

function PortfolioTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Purchase Price</th>
          <th>Qty</th>
          <th>Investment</th>
          <th>CMP</th>
          <th>Present Value</th>
          <th>Gain/Loss</th>
          <th>P/E Ratio</th>
          <th>Latest Earnings</th>
        </tr>
      </thead>
      <tbody>
        {data.map(stock => {
          const presentValue = stock.cmp * stock.quantity;
          const gainLoss = presentValue - stock.investment;
          return (
            <tr key={stock._id}>
              <td>{stock.name}</td>
              <td>{stock.purchasePrice}</td>
              <td>{stock.quantity}</td>
              <td>{stock.investment}</td>
              <td>{stock.cmp}</td>
              <td>{presentValue.toFixed(2)}</td>
              <td className={gainLoss >= 0 ? "gain" : "loss"}>
                {gainLoss.toFixed(2)}
              </td>
              <td>{stock.peRatio || "N/A"}</td>
              <td>{stock.earnings || "N/A"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default PortfolioTable;
