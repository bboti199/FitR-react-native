import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(...middlewares),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};
