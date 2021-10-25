/**
 * React Native App
 */
import { AppStateProvider } from '@shared/providers/AppStateProvider';
import { AxiosApiProvider } from '@shared/providers/AxiosApiProvider';
import { CodePushProvider } from '@shared/providers/CodePushProvider';
import '@shared/services/translation';
import configureStore from '@src/redux/store';
import React from 'react';
import { ActivityIndicator, YellowBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootNavigation } from './navigation';

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

if (__DEV__) {
  import('../ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}

const { persistor, store } = configureStore();

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <CodePushProvider>
          <AppStateProvider>
            <PaperProvider>
              <AxiosApiProvider>
                <RootNavigation />
              </AxiosApiProvider>
            </PaperProvider>
          </AppStateProvider>
        </CodePushProvider>
      </PersistGate>
    </Provider>
  );
};
