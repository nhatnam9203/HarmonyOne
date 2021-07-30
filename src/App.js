/**
 * React Native App
 */
import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootNavigation } from './navigation';
import configureStore from './store';
import { CodePushProvider } from '@shared/providers/CodePushProvider';
import { AxiosApiProvider } from '@shared/providers/AxiosApiProvider';

if (__DEV__) {
  import('../ReactotronConfig.js').then(() =>
    console.log('Reactotron Configured'),
  );
}

const { persistor, store } = configureStore();

const App = () => {
  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

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
