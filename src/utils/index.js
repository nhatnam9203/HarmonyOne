import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions, Platform } from 'react-native';
import NavigationService from '@navigation/NavigationService';
import { baseURL } from '../config';
import axios from 'axios';
export * from './dejavooRequest';

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}


export function isIphoneX() {
  let dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export const scaleWidth = (size) => wp(size);
export const scaleHeight = (size) => hp(size);

export const slop = {
  top: 20,
  height: 20,
  right: 20,
  left: 20
}

export const requestAPI = async (action, header = {}) => {
  let method = action.method || "GET";
  let headers = Object.assign(
    { Accept: "application/json", "Content-Type": "application/json" },
    header,
  );
  if (action.token) {
    headers["Authorization"] = `Bearer ${action.token}`;
  }

  let configs = {
    method: `${method}`,
    baseURL: baseURL,
    url: `${action.route}`,
    headers: headers,
    timeout: 20000,
    validateStatus: (status) => status >= 200 && status < 600,
  };
  if ((method == "POST" || method == "DELETE" || method == "PUT") && action.body) {
    configs["data"] = JSON.stringify(action.body);
  }

  try {
    let response = await axios(configs);

    const codeNumber = response.status ? response.status : 0;
    if (codeNumber === 200) {
      if (response.data.codeNumber == 401) {
        NavigationService.navigate("Auth");
        alert(response.data.message);
        return;
      }
      return response.data;
    }

    if (codeNumber === 401) {
      NavigationService.navigate("Auth");
      alert("Your session is expired , please login again");
      return;
    } else if (codeNumber === 404) {
      return {
        codeNumber: 404,
        message: "NOT_FOUND " + action.route,
      };
    } else
      return {
        codeNumber: 401,
        codeStatus: 0,
        data: "",
        message:
          response.data && response.data.message
            ? response.data.message
            : `error from : ${action.route}`,
      };
  } catch (error) {
    if (error.request) {
      if (error.message.includes("timeout")) {
        return {
          codeNumber: 402,
          message: "Time out 20s",
        };
      } else if (error.message.includes("Network Error")) {
        return {
          codeNumber: 502,
          message: "Network error",
        };
      } else {
        throw error;
      }
    }
    return {
      codeNumber: 401,
      message: "something went wrong.",
    };
  }
};

export const statusConvert = {
  unconfirm : 'Unconfirm',
  confirm : 'Confirmed',
  checkin : 'Checked in',
  paid : 'Paid',
  cancel : 'Cancel'
};

export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  if (h !== 0){
    if(m == 0) return `${h} hour`;
    return `${h} hour ${m} min`;
  }
  return `${m} min`;
}
