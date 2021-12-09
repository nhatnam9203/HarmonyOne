// import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getModalNameOfPrinter
} from '@shared/utils';

const reducerName = 'hpo.hardware';
const initialState = {
  printerList: [],
  printerSelect: '',
  printerPortType: 'Bluetooth',
  bluetoothPaxInfo: {
    id: '',
    name: '',
  },
  paxMachineInfo: {
    commType: '',
    name: '',
    ip: '',
    port: '',
    timeout: 90000,
    bluetoothAddr: '',
    isSetup: false,
  },
  cloverMachineInfo: {
    name: 'Clover',
    ip: '',
    port: '',
    isSetup: false,
    token: null,
    serialNumber: '',
  },
  dejavooMachineInfo: {
    name: '',
    registerId: '',//'83216002',
    authKey: '',//'d4RL8FrETi',
    isSetup: false,
  },
  paymentMachineType: '',

};
const hardwareSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    saveBluetoothPaxInfo: (state, action) => {
      state.bluetoothPaxInfo = action.payload
    },
    setupPaxMachine: (state, action) => {
      state.paxMachineInfo = action.payload.paymentMachineInfo;
      state.paymentMachineType = action.payload.paymentMachineType;
    },
    setupCloverMachine: (state, action) => {
      state.cloverMachineInfo = {...state.cloverMachineInfo, 
        ip: action.payload.paymentMachineInfo.ip,
        port: action.payload.paymentMachineInfo.port,
        isSetup: action.payload.paymentMachineInfo.isSetup,
        serialNumber: action.payload.paymentMachineInfo.serialNumber,
      };
      state.paymentMachineType = action.payload.paymentMachineType;
    },
    setCloverToken: (state, action) => {
      state.cloverMachineInfo = {
        ...state.cloverMachineInfo,
        token: action.payload,
      };
    },
    setupDejavooMachine: (state, action) => {
      state.dejavooMachineInfo = {...state.dejavooMachineInfo, 
        registerId: action.payload.paymentMachineInfo.registerId,
        authKey: action.payload.paymentMachineInfo.authKey,
        isSetup: action.payload.paymentMachineInfo.isSetup,
        name: action.payload.paymentMachineInfo.name,
      };
      state.paymentMachineType = action.payload.paymentMachineType;
    },
    setDejavooMachineSN: (state, action) => {
      state.dejavooMachineInfo = {
        ...state.dejavooMachineInfo,
        sn: action.payload,
      }
    },
    deleteHardware: (state, action) => {
      state.paxMachineInfo = {
        commType: '',
        name: '',
        ip: '',
        port: '',
        timeout: 90000,
        bluetoothAddr: '',
        isSetup: false,
        terminalName: 'Pax',
      };
      state.cloverMachineInfo = {
        name: 'Clover',
        ip: '',
        port: '',
        isSetup: false,
        token: null,
      };
      state.dejavooMachineInfo = {
        name: '',
        registerId: '',
        authenKey: '',
        isSetup: false,
        sn: '',
      };
    },
    updatePrinterPortType: (state, action) => {
      state.printerPortType = action.payload;
    },
    selectPrinter: (state, action) => {
      state.printerSelect = action.payload;
    },
    updatePrinterList: (state, action) => {
      state.printerList = action.payload
      state.printerSelect = getModalNameOfPrinter(
        action.payload,
        state.printerSelect,
      )
    },

  },
});
const { actions, reducer } = hardwareSlice;

let hardwareReducer = persistReducer(
  {
    key: 'hardware',
    storage: AsyncStorage,
    whitelist: [],
  },
  reducer,
);

module.exports = {
  reducer: hardwareReducer,
  actions: { ...actions },
};

// const sensitiveStorage = createSensitiveStorage({
//   keychainService: 'myKeychain',
//   sharedPreferencesName: 'mySharedPrefs',
// });

// const dataLocalPersistConfig = {
//   key: 'hardware',
//   storage: sensitiveStorage,
// };

// module.exports = persistReducer(dataLocalPersistConfig, hardwareReducer);