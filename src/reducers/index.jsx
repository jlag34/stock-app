import {combineReducers} from 'redux';

import {editPortfolioData} from '../utils/utils';
import {CLEAR_ERROR, COMPUTE_TOTAL, FETCH_STOCK, EDIT_PORTFOLIO, HANDLE_ERROR}  from '../actions';

//Handles errors that are dispatched
const error = (state = null, action) => {
	switch(action.type) {
		case HANDLE_ERROR:
			return action.payload;

		case CLEAR_ERROR:
			return null;
	}
	return state;
}

//Handles money
const money = (state = '100000.00', action) => {
	switch(action.type) {
		case COMPUTE_TOTAL:
			return action.payload;
	}
	return state;
}

//Handles the users portfolio
const portfolio = (state = [], action) => {
	switch(action.type) {
		case EDIT_PORTFOLIO:
			return editPortfolioData(state, action.payload);
	}
	return state;
}

//Fetches stock based on user input
const stock = (state = {}, action) => {
  switch(action.type) {
    case FETCH_STOCK:
			const data = action.payload.data;
      return data[Object.keys(data)[0]];
  }
  return state;
}


const rootReducer = combineReducers({
	error, money, portfolio, stock
});

export default rootReducer;