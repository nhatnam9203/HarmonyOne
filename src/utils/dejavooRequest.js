import axios from "axios";
import _ from "lodash";
import { parseString } from "react-native-xml2js";
let headers = Object.assign(
  { Accept: "xml", "Content-Type": "xml" }
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
   
      console.log('response', response)
      if (parseInt(_.get(response, 'status')) == 200) {
        const xmlResponse = _.get(response, 'data')
        return xmlResponse
      } else {
        return '<xmp><response><ResultCode>999</ResultCode><Message>Error</Message></response></xmp>'
      }
    } catch (error) {
      console.log('error', error)
      return '<xmp><response><ResultCode>999</ResultCode><Message>Error</Message></response></xmp>'
    }
  }
  
  // export const requestPrintDejavoo = async (params) => {
  //   const dejavooMachineInfo = _.get(params, 'dejavooMachineInfo');
  //   const param = `<request>`+
  //               `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
  //               `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
  //               `<printer width="24">`+
  //               `<t><c><b>Header</b></c></t>
  //               <t>02-15-2014</t><t>09:45:29</t><lf/>
  //               `+
  //               `<t>Trans. Number:</t>`+
  //               // `<img>${_.get(params, 'image')}</img>`+
  //               // `<img>Qk2uCAAAAAAAAD4AAAAoAAAACwEAADwAAAABAAEAAAAAAHAIAADEDgAAxA4AAAAAAAAAAAAAAAAAAP///wD/////////////////////P//////////////////////gAAD/////////////////////D//////////////////////gAAD/////////////////////j//////////////////////gAAD/////////////////////h//////////////////////gAAD/////////////////////xP/////////////////////gAAD/////////8f//////////4J/////////////////////gAAD/////////8AAf////////85n////////////////////gAAD/////+Af/8AAAH///////8/n////////////////////gAAD/////4Af/8AAAAH//////8/+R///j///////////////gAAD/////4GP//g/gAH//////8/+R/gAiMY4////////////gAAD////+I/P//8D/4BiP////8//xGAAiMY444//////////gAAD////4P/P///Af/5iP////8///AAA+MY444//////////gAAD////h//D///8H//iMD///5///AD/////44z/////////gAAD///+H//z///8B///8D///4///wz///////z5////////gAAD///4f//5////B///8Cf//4///w/P///////588//////gAAD///5///5////wf///+c//4///wfM////////88+f////gAAD///n////////+D////8//5///4f8z/////////+fOf//gAAD///n///8/////g/////z/5///4P/z///////////Of//gAAD///////8/////g/////yfz////D//P////////////z/gAAD/////////////4/////+fz////w//J////////////zmAAAD///////+f/////P/////nn////8n/5P////////////mAAAD///////+f/////D/////hn/////nJPJ/////////////gAAD/8/////+f/////z/////5n//////JMhD//////////v/gAAD/8/////+f//////P/////H///////8kAf/////////nngAAD/z/////////////D/////H////////8gf//////////ngAAD/z//////j//////z/////B//////////////////////gAAD/P//////j//////5////+Yf/////////////////////gAAD+P//////j//////4f///+cf/////////////////////gAAD+f//////x//////+P////8f/////////////////////gAAD+f//////x///////P///88f/////////////////////gAAD+f//////w///////n///88P/////////////////////gAAD8///////4///////n///z+P/////////////////////gAAD8///////4f//////z///z+P/////////////////////gAAD8///////8f//////x///z+f/////////////////////gAAD8///////8P//////5///z+P/////////////////////gAAD8///////+P//////8///j+P/////////////////////gAAAE///////+H//////4///j+H/////////////////////gAAAAf///////H//////5///j/H/////////////////////gAAAAT///////H//////5///P/H/////////////////////gAAD+CSc/////z//////5///P+f/////////////////////gAAD+OSc+f///z//////5//+f+f/////////////////////gAAD+P//+cz//8//////x//+f+f/////////////////////gAAD/H///8yY/8P/////z////+f/////////////////////gAAD/n////+YH+D////+H//+f+P/////////////////////gAAD/5/////4H+Af///+H//8f+P/////////////////////gAAD/4f/////AfgD///4H//8f8P/////////////////////gAAD/+H/////4P8Af/+B///8f4f/////////////////////gAAD//k//////H/gH/CH///8f4f/////////////////////gAAD//8//////n/8ABD////+fg//////////////////////gAAD///n/////n//AAH////+fj//////////////////////gAAD///n/////n//wA/////+fj//////////////////////gAAD/////////j/////////+OP//////////////////////gAAD/////////x//////////MP//////////////////////gAAD////P////5//////////gP//////////////////////gAAD////J////5//////////gf//////////////////////gAAD////5////w//////////g///////////////////////gAAD/////+f//A//////////g///////////////////////gAAD/////+TOAH//////////x///////////////////////gAAD//////zOAf//////////////////////////////////gAAD////////P///////////////////////////////////gAAA=</img>` +
  //               // `<img>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</img>`+
  //               `</printer>`+
  //               `</request>`
    
  //  const configs = {
  //   method: "get",
  //   baseURL: api,
  //   url: `?Printer=${param}`,
  //   headers: headers,
  //   timeout: 90000,
  //   };
  //   const response = await handleRequest(configs)
  //   console.log('response', response)
  //   return response
  // };

  export const requestPrintDejavoo = async (params) => {
    const dejavooMachineInfo = _.get(params, 'dejavooMachineInfo');
    
    const param = `<request>`+
                `<AuthKey>${_.get(dejavooMachineInfo, 'authKey')}</AuthKey>`+
                `<RegisterId>${_.get(dejavooMachineInfo, 'registerId')}</RegisterId>`+
                `<printer width="24" removeExtraSpaces="false">`+
                `${_.get(params, 'content')}`+
                // `<img>Qk2uCAAAAAAAAD4AAAAoAAAACwEAADwAAAABAAEAAAAAAHAIAADEDgAAxA4AAAAAAAAAAAAAAAAAAP///wD/////////////////////P//////////////////////gAAD/////////////////////D//////////////////////gAAD/////////////////////j//////////////////////gAAD/////////////////////h//////////////////////gAAD/////////////////////xP/////////////////////gAAD/////////8f//////////4J/////////////////////gAAD/////////8AAf////////85n////////////////////gAAD/////+Af/8AAAH///////8/n////////////////////gAAD/////4Af/8AAAAH//////8/+R///j///////////////gAAD/////4GP//g/gAH//////8/+R/gAiMY4////////////gAAD////+I/P//8D/4BiP////8//xGAAiMY444//////////gAAD////4P/P///Af/5iP////8///AAA+MY444//////////gAAD////h//D///8H//iMD///5///AD/////44z/////////gAAD///+H//z///8B///8D///4///wz///////z5////////gAAD///4f//5////B///8Cf//4///w/P///////588//////gAAD///5///5////wf///+c//4///wfM////////88+f////gAAD///n////////+D////8//5///4f8z/////////+fOf//gAAD///n///8/////g/////z/5///4P/z///////////Of//gAAD///////8/////g/////yfz////D//P////////////z/gAAD/////////////4/////+fz////w//J////////////zmAAAD///////+f/////P/////nn////8n/5P////////////mAAAD///////+f/////D/////hn/////nJPJ/////////////gAAD/8/////+f/////z/////5n//////JMhD//////////v/gAAD/8/////+f//////P/////H///////8kAf/////////nngAAD/z/////////////D/////H////////8gf//////////ngAAD/z//////j//////z/////B//////////////////////gAAD/P//////j//////5////+Yf/////////////////////gAAD+P//////j//////4f///+cf/////////////////////gAAD+f//////x//////+P////8f/////////////////////gAAD+f//////x///////P///88f/////////////////////gAAD+f//////w///////n///88P/////////////////////gAAD8///////4///////n///z+P/////////////////////gAAD8///////4f//////z///z+P/////////////////////gAAD8///////8f//////x///z+f/////////////////////gAAD8///////8P//////5///z+P/////////////////////gAAD8///////+P//////8///j+P/////////////////////gAAAE///////+H//////4///j+H/////////////////////gAAAAf///////H//////5///j/H/////////////////////gAAAAT///////H//////5///P/H/////////////////////gAAD+CSc/////z//////5///P+f/////////////////////gAAD+OSc+f///z//////5//+f+f/////////////////////gAAD+P//+cz//8//////x//+f+f/////////////////////gAAD/H///8yY/8P/////z////+f/////////////////////gAAD/n////+YH+D////+H//+f+P/////////////////////gAAD/5/////4H+Af///+H//8f+P/////////////////////gAAD/4f/////AfgD///4H//8f8P/////////////////////gAAD/+H/////4P8Af/+B///8f4f/////////////////////gAAD//k//////H/gH/CH///8f4f/////////////////////gAAD//8//////n/8ABD////+fg//////////////////////gAAD///n/////n//AAH////+fj//////////////////////gAAD///n/////n//wA/////+fj//////////////////////gAAD/////////j/////////+OP//////////////////////gAAD/////////x//////////MP//////////////////////gAAD////P////5//////////gP//////////////////////gAAD////J////5//////////gf//////////////////////gAAD////5////w//////////g///////////////////////gAAD/////+f//A//////////g///////////////////////gAAD/////+TOAH//////////x///////////////////////gAAD//////zOAf//////////////////////////////////gAAD////////P///////////////////////////////////gAAA=</img>` +
                // `<img>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</img>`+
                `</printer>`+
                `</request>`
    
   const configs = {
    method: "post",
    baseURL: "https://spinpos.net/spin/",
    url: "Transaction",
    headers: headers,
    timeout: 90000,
    data: param
    };
    console.log('config param', param)
    const response = await handleRequest(configs)
    console.log('response', response)
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