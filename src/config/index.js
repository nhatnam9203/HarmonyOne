import { Dimensions, Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';

import EvnConfigs from 'react-native-config';

const AppConfigs = {
  APP_VERSION: getVersion(),
  CODE_PUSH_VERSION: 1,
};

const Configs = Object.assign({}, AppConfigs, EvnConfigs);
// const Configs = Object.assign(EvnConfigs, AppConfigs, {
//   API_URL: 'https://dev.harmonypayment.com/api/',
//   SOCKET_URL: 'https://dev-signalr.harmonypayment.com/',
//   REDUX_LOGGER: false,
// });
export default Configs;
