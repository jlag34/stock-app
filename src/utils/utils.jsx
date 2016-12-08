export const editPortfolioData = (state, data) => {
  const {name, pricePaid, symbol} = data;
  //Data is constantly becoming strings instead of numbers, bad for adding
  const amount = Number(data.amount);
  //ES6 coolness - try to find name of stock in user portfolio
  const obj = state.find(x => x.name === name);

  if (obj) {
    //If found, do something with it
    let index = state.indexOf(obj);
    const currentAmount = Number(state[index].amount);
    const newAmount = currentAmount + amount;

    //If the new amount of stock is going to be 0, remove the stock from portfolio
    if (newAmount === 0) {
      state.splice(index, 1);
      //Return new array, dont mutate state
      return state.slice();
    }

    //Otherwise fill new amount - more ES6 coolness
    state.fill(obj.amount = newAmount, index, index++);
  } else {
    state.push({amount, name, pricePaid, symbol});
  }
  //Return new array, dont mutate state
  return state.slice();
};

//Finds a stock in a portfolio
export const findPortfolio = (list, target) => {
  const obj =  list.find(x => x.name === target);
  const index = list.indexOf(obj);
  return list[index];
}