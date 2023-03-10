import Axios from 'axios';
import Configs from '@src/config';
import { Platform } from 'react-native';
import { ErrorHandler } from './ErrorHandler';
import { getAuthTokenReport } from '@shared/storages/authToken';
import DevviceInfo from "react-native-device-info";
import { getDeviceId, getDeviceName } from '@shared/services/Device';
import { getDeviceIdStorage } from '@shared/storages/deviceUnique';

const log = (obj, message = '') => {
  // Logger.log(`[axiosClient] ${message}`, obj);
};

export const axios = Axios.create({
  baseURL: Configs.API_REPORT_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': `HarmonyOne/${Configs.APP_VERSION}.${Configs.CODE_PUSH_VERSION}/${Platform.OS}`,
  },
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = await getAuthTokenReport();
    const deviceId = await getDeviceId();
    const deviceName = await getDeviceName();
    const device = await `${encodeURIComponent(deviceName)}_${deviceId}`;
    const deviceID_Storaged = await getDeviceIdStorage();
    
    if (token) {
      config.headers = Object.assign({}, config.headers, {
        authorization: `Bearer ${token}`
      });
    }

    config.headers = Object.assign({}, config.headers, {
      DeviceID: deviceID_Storaged ? deviceID_Storaged : device
    });

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    log(response, 'response');
    const { codeStatus = 0, codeNumber = 0, message } = response?.data;
    switch (parseInt(codeNumber, 10)) {
      case 401:
        if (parseInt(codeStatus, 10) === 5) {
          alert('Permission Denied');
        } else {
          // NavigationServices.logout();
        }
        break;
      case 404: // not found
        console.log(`${message} , code ${parseInt(codeStatus)}`);
        break;
      default:
        break;
    }


    return response;
  },
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      // localStorage.setItem('token', await refreshAccessToken());

      return axios(config);
    }

    return Promise.reject(error);
  },
);
