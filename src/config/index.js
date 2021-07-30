import { Dimensions, Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';

import EvnConfigs from 'react-native-config';

export const baseURL = 'https://staging.harmonypayment.com/api/';
export const urlSignalR = 'https://staging.harmonypayment.com';

const AppConfigs = {
  APP_VERSION: getVersion(),
  CODE_PUSH_VERSION: 1,
};

// const Configs = Object.assign({}, AppConfigs, EvnConfigs);
const Configs = Object.assign(EvnConfigs, AppConfigs, {
  API_URL: 'https://staging.harmonypayment.com/api/',
  SOCKET_URL: 'https://staging.harmonypayment.com/',
});
export default Configs;
