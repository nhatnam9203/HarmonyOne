import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../../ReactotronConfig';
// import { authMiddleware } from '../middlewares';
import sagaRoot from '../saga';
import { rootReducers } from '../slices'; // where reducers is a object of reducers
import Configs from '@src/config';

const middleware = [];

let sagaMiddleware = createSagaMiddleware();
if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}

// middleware.push(authMiddleware);
middleware.push(sagaMiddleware);
if (__DEV__ && Configs.REDUX_LOGGER) {
  middleware.push(createLogger());
}

const persistConfig = {
  key: 'root',
  version: 1.0,
  storage: AsyncStorage,
  blacklist: ['app', 'auth'],
  debug: __DEV__, //to get useful logging
};

const reducers = combineReducers(Object.assign({}, rootReducers));
const persistedReducer = persistReducer(persistConfig, reducers);

// const enhancers = [applyMiddleware(...middleware)];
// const persistConfig: any = { enhancers };
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

const initialState = {};
let enhancers;
if (__DEV__) {
  enhancers = [Reactotron.createEnhancer()];
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
    ...middleware,
  ],
  preloadedState: initialState,
  devTools: __DEV__,
  enhancers: enhancers,
});

const persistor = persistStore(store);

const reduxStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(sagaRoot);

module.exports = reduxStore;
