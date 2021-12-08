import Axios from 'axios';
import Configs from '@src/config';
import { Platform } from 'react-native';
import { ErrorHandler } from './ErrorHandler';
import { getAuthToken } from '@shared/storages/authToken';
import DevviceInfo from "react-native-device-info";

const log = (obj, message = '') => {
  // Logger.log(`[axiosClient] ${message}`, obj);
};

log(Configs, 'Configs');
export const axios = Axios.create({
  // baseURL:  Configs.API_URL,
  baseURL: `https://staging.harmonypayment.com/api/`,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': `HarmonyOne/${Configs.APP_VERSION}.${Configs.CODE_PUSH_VERSION}/${Platform.OS}`,
    DeviceID: `${encodeURIComponent(DevviceInfo.getDeviceName())}_${DevviceInfo.getUniqueId()}`,
    // DeviceID : `${encodeURIComponent('iPad Pro (11-inch) (3rd generation)')}_E47921F7-3B6B-4138-BE2E-3B4A8E3FA2F2`,
  },
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) { 
      config.headers = Object.assign({}, config.headers, {
        authorization: `Bearer ${token}`,
      }); 
    }

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
      // case 400: // thieu field
      //   if (codeStatus !== 2) {
      //     // exception cho phone not exist -> checkout
      //     alert(`${message}`);
      //   }

        // break;
      default:
        break;
    }


    return response;
  },
  async (error) => {
    log(error, 'error');
    const config = error?.config;

    if (error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      // localStorage.setItem('token', await refreshAccessToken());

      return axios(config);
    }

    return Promise.reject(error);
  },
);
