import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import Reactotron from '../../ReactotronConfig';
import rootReducers from './reducers'; // where reducers is a object of reducers
import sagas from './sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'loginReducer'],
  debug: true, //to get useful logging
};

const middleware = [];
let sagaMiddleware = createSagaMiddleware();

if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}
middleware.push(sagaMiddleware);

// if (__DEV__) {
//   middleware.push(createLogger());
// }

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(sagas);

export default configureStore;
