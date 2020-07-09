import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

const middleware = [thunk, promise];
const enhancers = composeWithDevTools(applyMiddleware(...middleware));

const configureStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState, enhancers);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
