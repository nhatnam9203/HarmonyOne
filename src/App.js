/**
 * React Native App
 */
import { AxiosApiProvider } from '@shared/providers/AxiosApiProvider';
import { CodePushProvider } from '@shared/providers/CodePushProvider';
import '@shared/services/translation';
import configureStore from '@src/redux/store';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootNavigation } from './navigation';

if (__DEV__) {
  import('../ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}

const { persistor, store } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <CodePushProvider>
          <PaperProvider>
            <AxiosApiProvider>
              <RootNavigation />
            </AxiosApiProvider>
          </PaperProvider>
        </CodePushProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
