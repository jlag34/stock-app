import axios from 'axios';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const COMPUTE_TOTAL = 'COMPUTE_TOTAL';
export const EDIT_PORTFOLIO = 'EDIT_PORTFOLIO';
export const FETCH_STOCK = 'FETCH_STOCK';
export const HANDLE_ERROR = 'HANDLE_ERROR';

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};

export const computeTotal = (sum) => {
  return {
    type: COMPUTE_TOTAL,
    payload: sum
  };
};

export const editPortfolio = (amount, name, pricePaid, symbol) => {
  return {
    type: EDIT_PORTFOLIO,
    payload: {amount, name, pricePaid, symbol} 
  };
};

export const handleError = (message) => {
  return {
    type: HANDLE_ERROR,
    payload: message
  };
};

export const fetchStock = (stock) => {
  const url = `/api/${stock}`;
  const request = axios.get(url);
  return {
    type: FETCH_STOCK,
    payload: request
  };
};