import axios from "axios";
import _ from "lodash";
import { parseString } from "react-native-xml2js";
let headers = Object.assign(
  { Accept: "application/json", "Content-Type": "application/json" }
);

const api = 'https://spinpos.net/spin/cgi.html'

export const requestTransactionDejavoo = async (params) => {
    const dejavooMachineInfo = _.get(params, 'dejavooMachineInfo');
    const transType = _.get(params, 'transType')
    const param = `<request>`+
                `<PaymentType>${_.get(params, 'tenderType')}</PaymentType>`+
                `<TransType>${transType}</TransType>`+
                `<Amount>${_.get(params, 'amount')}</Amount>`+
                `<InvNum>${_.get(params, 'invNum')}</InvNum>`+
                `<RefId>${_.get(params, 'RefId', '1')}</RefId>`+
                `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
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
    const dejavooMachineInfo = _.get(params, 'dejavooMachineInfo');
    const param = `<request>`+
                `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
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

  export const requestSettlementDejavoo = async (params) => {
    const dejavooMachineInfo = _.get(params, 'dejavooMachineInfo');
    const param = `<request>`+
                `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
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