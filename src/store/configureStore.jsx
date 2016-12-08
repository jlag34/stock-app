import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';
import { applyMiddleware, compose, createStore } from 'redux';

export default function configureStore(initialState) {
  let createStoreWithMiddleware = null;
  const middleware = applyMiddleware(promiseMiddleware);
  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

  createStoreWithMiddleware = compose(middleware, devTools);

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
    );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require, max-len

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
