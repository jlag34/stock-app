import React, {PropTypes} from 'react';
import {Button} from 'semantic-ui-react';

const Portfolio = (props) => {
  const {handleButton, money, portfolio} = props;
  return (
    <div className="portfolio-wrapper">
      <div className="portfolio-header-wrapper header-margin">
        <div className="portfolio-header">Current Portfolio</div>
        <div className="portfolio-header">${money}</div>
      </div>
      <table className="stock-table">
        <tbody>
          <tr>
            <th className="stock-table-header">Company</th>
            <th className="stock-table-header">Quantity</th>
            <th className="stock-table-header">Price Paid</th>
            <th className="stock-table-header"></th>
          </tr>
          {
            portfolio.map(stock => {
              const {amount, name, pricePaid, symbol} = stock;
              return (
                <tr key={name}>
                  <td className="stock-table-row">{name}</td>
                  <td className="stock-table-row">{amount}</td>
                  <td className="stock-table-row">{pricePaid}</td>
                  <td className="stock-table-row">
                    <Button className="theme-btn" onClick={() => handleButton(symbol)}>View Stock</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

Portfolio.PropTypes = {
  handleButton: PropTypes.func,
  money: PropTypes.string.isRequired,
  Portfolio: PropTypes.array
}

export default Portfolio;