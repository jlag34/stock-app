import React, {Component, PropTypes} from 'react';
import {Button} from 'semantic-ui-react';

import {findPortfolio} from '../utils/utils';

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {input: null, portfolio: null};
  }

// askPrice, compute, editPortfolio, handleError, money, name, symbol
  static propTypes = {
    askPrice: PropTypes.number,
    compute: PropTypes.func.isRequired,
    editPortfolio: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    money: PropTypes.string.isRequired,
    name: PropTypes.string,
    symbol: PropTypes.string
  }

  componentDidMount(){
    this.checkForPortfolio(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.checkForPortfolio(nextProps);
  }

  // This will find if the company has any stock in the current company being displayed
  checkForPortfolio = (props) => {
    const portfolio = findPortfolio(props.portfolio, props.name) || null;
    this.setState({portfolio: portfolio});
  }

  // Format numbers (simplify to 2 decimal)
  formatNum = (num) => {
    return Number(parseFloat(num).toFixed(2));
  }

  // Save input to state
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // Some validation may never run because of disabled buttons but good to have a fallback
  buyValidation = () => {
    const {askPrice, compute, editPortfolio, handleError, money, name, symbol} = this.props;
    const {input} = this.state;
    const buyRequest = Number(input * askPrice);

    if(input == null || input.length < 1) {
      handleError('Enter a number')
    }

    else if (isNaN(input)) {
      handleError('Enter a valid number');
    }
    else if (buyRequest > money) {
      handleError('You do not have enough money');
    }
    else {
      const newTotal = this.formatNum(money - buyRequest);
      compute(newTotal);
      editPortfolio(input, name, askPrice, symbol);
    }
  }

  sellValidation = () => {
    const sellCeiling = this.state.portfolio ? this.state.portfolio.amount : null;
    const sellAmount = this.state.input;
    const {bidPrice, compute, editPortfolio, handleError, money, name} = this.props;

    if (sellAmount == null || sellAmount < 1) {
      handleError('Enter a number')
    }
    
    else if (isNaN(sellAmount)) {
      handleError('Enter a valid number');
    }
    
    else if (sellAmount > sellCeiling) {
      handleError('You cannot sell more than you have');
    }
    else {
      const profit = sellAmount * bidPrice;
      const newTotal = this.formatNum(profit + money);
      compute(newTotal);
      editPortfolio((this.state.input*-1), name);
    }
  }
  
  render(){
    //Handle text and button disable states
    const {askPrice, bidPrice, error, name, symbol} = this.props;
    const ask = error || (name && !askPrice) ? 'Not available' : askPrice;
    const bid = error || (name && !bidPrice) ? 'Not available' : bidPrice;
    const disabledAsk = error || (!name || !askPrice) ? true : false;
    const disabledBid = error || !this.state.portfolio || (!name || !bidPrice) ? true : false;
    const headerText = error ? error.message :
                          name ? `${name} (${symbol})` : '';

    return (
      <div className="stock-wrapper">
        <div className="header-margin">
          <h3>{headerText}</h3>
        </div>
        <table className="stock-table">
          <tbody>
            <tr>
                <th className="stock-table-header">Buy</th>
                <th className="stock-table-header">Sell</th>
            </tr>
            <tr>
                <td className="stock-table-row">{ask}</td>
                <td className="stock-table-row">{bid}</td>
            </tr>
          </tbody>
        </table>
        <div className="stock-action-area">
          <input className="quantity-input" onChange={this.onInputChange} placeholder="Quantity" />
          <Button className="stock-action-btn theme-btn" disabled={disabledAsk} onClick={this.buyValidation}>Buy</Button>
          <Button className="stock-action-btn theme-btn" disabled={disabledBid} onClick={this.sellValidation}>Sell</Button>
        </div>
      </div>
    );
  }
}

export default Stock;