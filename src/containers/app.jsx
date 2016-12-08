import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

import {clearError, fetchStock, handleError} from '../actions';
import Error from '../components/error';
import Header from '../components/header';
import Dashboard from './dashboard';

class App extends Component {
	constructor(props) {
		super(props);

		this.state={query: ''};
	}

	static propTypes = {
		clearError: PropTypes.func.isRequired,
		error: PropTypes.string,
		fetchStock: PropTypes.func.isRequired,
		handleError: PropTypes.func.isRequired
	}

	//If a symbol is in the url on page load, handle it
	componentWillMount(){
		const query = this.props.location.pathname.substring(1);

		if (query.length) {
    	this.setState({query});
			this.props.fetchStock(query);
		}
  }

	// Func for portfolio button `view stock` - changes to that stock
	handleButton = (symbol) => {
		this.setState({query: symbol});
		browserHistory.push(`/${symbol}`);
		this.props.fetchStock(symbol);
	}

	handleChange = event => {
		this.setState({query:event.target.value});
	}
	
	// make sure we dont query for the same app twice then fetch
	handleSubmit = () => {
		const {query} = this.state;
		const noRepeat = query !== this.props.location.pathname.substring(1);
		if (query && query.length && noRepeat) {
    	browserHistory.push(`/${query}`);
			this.props.fetchStock(query);
		}
  }

	render() {
		return(
			<div>
				<Error error={this.props.error} clearError={this.props.clearError} />
				<Header handleChange={this.handleChange} handleSubmit={this.handleSubmit} textVal={this.state.query} />
				<Dashboard handleButton={this.handleButton} handleError={this.props.handleError} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {error: state.error};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({clearError, fetchStock, handleError}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);