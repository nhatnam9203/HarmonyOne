import { Dimensions, Platform } from 'react-native';

import EvnConfigs from 'react-native-config';

export const baseURL = 'https://staging.harmonypayment.com/api/';
export const urlSignalR = 'https://staging.harmonypayment.com';

const AppConfigs = {};

const Configs = Object.assign({}, AppConfigs, EvnConfigs);
// const Configs = Object.assign(EvnConfigs, AppConfigs, {
//   API_URL: 'https://dev.harmonypayment.com/api/',
//   SOCKET_URL: 'https://dev.harmonypayment.com/',
// });
export default Configs;
