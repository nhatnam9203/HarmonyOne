import axios from "axios";
import {
    AUTHEN_KEY,
  } from '@utils';
import _ from "lodash";
import { parseString } from "react-native-xml2js";
// import configureStore from "../redux/store";
// const { store } = configureStore();
let headers = Object.assign(
  { Accept: "application/json", "Content-Type": "application/json" }
);

const api = 'https://spinpos.net/spin/cgi.html'
const RegisterId = "83216001"
const AuthKey = "d4RL8FrETi"

export const requestTransactionDejavoo = async (params) => {
  //Will change when complete hardware screen
    // const { hardware } = store.getState();
    // const { dejavooMachineInfo } = hardware;
    const transType = _.get(params, 'transType')
    const param = `<request>`+
                `<PaymentType>${_.get(params, 'tenderType')}</PaymentType>`+
                `<TransType>${transType}</TransType>`+
                `<Amount>${_.get(params, 'amount')}</Amount>`+
                `<InvNum>${_.get(params, 'invNum')}</InvNum>`+
                `<RefId>${_.get(params, 'RefId', '1')}</RefId>`+
                `<AuthKey>${AuthKey}</AuthKey>`+
                `<RegisterId>${RegisterId}</RegisterId>`+
                // `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                // `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
                `<PrintReceipt>No</PrintReceipt>`+
                `</request>`
    
   const configs = {
    method: "get",
    baseURL: api,
    url: `?TerminalTransaction=${param}`,
    headers: headers,
    timeout: 90000,
    };
    const response = await handleRequest(configs)
    return response
  };

  const handleRequest = async (configs) => {
    try {
      const response = await axios(configs);
   
      if (parseInt(_.get(response, 'status')) == 200) {
        const xmlResponse = _.get(response, 'data')
        return xmlResponse
      } else {
        return '<xmp><response><ResultCode>999</ResultCode><Message>Error</Message></response></xmp>'
      }
    } catch (error) {
      return '<xmp><response><ResultCode>999</ResultCode><Message>Error</Message></response></xmp>'
    }
  }
  
  export const requestPrintDejavoo = async (params) => {
    // const { hardware } = store.getState();
    // const { dejavooMachineInfo } = hardware;
    const param = `<request>`+
                // `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                // `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
                `<AuthKey>${AuthKey}</AuthKey>`+
                `<RegisterId>${RegisterId}</RegisterId>`+
                `<printer width="24">`+
                `<img>${_.get(params, 'image')}</img>`+
                `</printer>`+
                `</request>`
    
   const configs = {
    method: "get",
    baseURL: api,
    url: `?TerminalTransaction=${param}`,
    headers: headers,
    timeout: 90000,
    };
    const response = await handleRequest(configs)
    return response
  };

  export const requestSettlementDejavoo = async () => {
    // const { hardware } = store.getState();
    // const { dejavooMachineInfo } = hardware;
    const param = `<request>`+
                // `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                // `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
                `<AuthKey>${AuthKey}</AuthKey>`+
                `<RegisterId>${RegisterId}</RegisterId>`+
                `<RefId>${Date.now()}</RefId>`+
                `<TransType>Settle</TransType>`+
                `<Param>Close</Param>`+
                `</request>`
    
   const configs = {
    method: "get",
    baseURL: api,
    url: `?TerminalTransaction=${param}`,
    headers: headers,
    timeout: 90000,
    };
    const response = await handleRequest(configs)
    return response
  };