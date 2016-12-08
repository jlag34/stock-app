import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from 'semantic-ui-react';

import {editPortfolio, computeTotal} from '../actions';
import Stock from '../components/stock';
import Portfolio from '../components/portfolio';

class Dashboard extends Component {
  static propTypes = {
		computeTotal: PropTypes.func.isRequired,
		editPortfolio: PropTypes.func.isRequired,
		handleButton: PropTypes.func.isRequired,
		handleError: PropTypes.func.isRequired,
    money: PropTypes.string.isRequired,
    portfolio: PropTypes.array,
    stock: PropTypes.object
	}
  
  componentWillReceiveProps(nextProps){
    if (nextProps.stock.error) {
      this.props.handleError(nextProps.stock.error.message);
    }
  }

  render(){
    const {computeTotal, editPortfolio, handleButton, handleError, money, portfolio, stock} = this.props;
    return(
      <Grid>
        <Grid.Row>
          <Grid.Column width={7}>
            <Stock 
              {...stock} 
              compute={computeTotal} 
              editPortfolio={editPortfolio} 
              handleError={handleError}
              money={money} 
              portfolio={portfolio} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Portfolio handleButton={handleButton} money={money} portfolio={portfolio} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapDispatchToProps (dispatch){
	return bindActionCreators({computeTotal, editPortfolio}, dispatch)
}

function mapStateToProps(state){
	return {money: state.money, stock: state.stock, portfolio: state.portfolio};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);