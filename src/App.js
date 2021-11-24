/**
 * React Native App
 */
import { AppStateProvider } from '@shared/providers/AppStateProvider';
import { AxiosApiProvider } from '@shared/providers/AxiosApiProvider';
import { CodePushProvider } from '@shared/providers/CodePushProvider';
import '@shared/services/translation';
import configureStore from '@src/redux/store';
import React from 'react';
import { 
  ActivityIndicator, 
  YellowBox,
  NativeModules,
  NativeEventEmitter,
 } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootNavigation } from './navigation';
import { 
  FirebaseNotificationProvider,
  PopupPairingCode,
 } from "@shared/components";
import { getAuthToken } from '@shared/storages/authToken';
import _, { set } from "lodash";
import {
  hardware,
} from "@redux/slices";

const { clover } = NativeModules;

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

  const popupPairingRef = React.useRef(null);

  //ADD LISTENER FROM CLOVER MODULE
  let eventEmitter = new NativeEventEmitter(clover);
  let subscriptions = []

  const [visiblePopupParingCode, setVisiblePopupParingCode] = React.useState(false);
  const [pairingCode, setPairingCode] = React.useState("");

  const registerEvents = () => {
    clover.changeListenerStatus(true)
    subscriptions = [
        eventEmitter.addListener("pairingCode", (data) => {
          if (data) {
            const { invoice, hardware } = store.getState();
            const { paymentMachineType } = hardware;
            const text = `Pairing code: ${_.get(data, "pairingCode")}`;
            if(paymentMachineType == "Clover" ) {
              setPairingCode(text)

              setTimeout(() => {
                popupPairingRef?.current?.show()
              }, 500)
              
            }
          }
        }),
        eventEmitter.addListener("pairingSuccess", (data) => {
          const { hardware: { paymentMachineType } } = store.getState();
          store.dispatch(hardware.setCloverToken(_.get(data, "token")));
          if(paymentMachineType == "Clover" ) {
            setPairingCode("")
            popupPairingRef?.current?.hide()
          }
        }),

    ]
  }

  const unregisterEvents = () => {
    clover.changeListenerStatus(false)
    subscriptions.forEach(e => e.remove())
    subscriptions = []
  }

  React.useEffect(() => {

    registerEvents();

    return function cleanup() {
      unregisterEvents();
    };

  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <CodePushProvider>
          <AxiosApiProvider>
            <AppStateProvider>
              <PaperProvider>
                  <RootNavigation />
                  <FirebaseNotificationProvider token={null} />
                  <PopupPairingCode
                    ref={popupPairingRef}
                    message={pairingCode}
                  />
              </PaperProvider>
            </AppStateProvider>
          </AxiosApiProvider>
        </CodePushProvider>
      </PersistGate>
    </Provider>
  );
};
