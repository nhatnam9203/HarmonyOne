import moment from 'moment';
import { images } from "../themes/resources";
import RNFetchBlob from 'rn-fetch-blob';
import {
  Platform,
  NativeModules,
} from "react-native";
import PrintManager from "@lib/PrintManager";
import Share from "react-native-share";
import configureStore from '@src/redux/store';
import _, { min } from "lodash";
import { translate } from "@localize";
const { persistor, store } = configureStore();
const { clover } = NativeModules;

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/*---Clover----*/
export const REMOTE_APP_ID = '1MHMKSTW4HZ2P.BRXKQHNH5T1BW'
export const APP_NAME = 'HarmonyPOS'
export const POS_SERIAL = "POS"

export const APPOINTMENT_STATUS = {
  COMPLETE: 'complete',
  PROCESS: 'processing',
  SHIP: 'shipped',
  PENDING: 'pending',
  CANCEL: 'cancel',
  CLOSED: 'closed',
  RETURN: 'return',
  NOT_PAY: 'did not pay',
  CONFIRM: 'confirm',
  UN_CONFIRM: 'unconfirm',
  CHECK_IN: 'checkin',
  PAID: 'paid',
  VOID: 'void',
  REFUND: 'refund',
  WAITING: 'waiting',
  NOSHOW: 'no show',
};

export const getColorForStatus = (status) => {
  switch (`${status}`.toLowerCase()) {
    case APPOINTMENT_STATUS.PAID:
      return '#4AD100';
    case APPOINTMENT_STATUS.PENDING:
      return '#0764B0';
    case APPOINTMENT_STATUS.COMPLETE:
      return '#0035FF';
    case APPOINTMENT_STATUS.CANCEL:
      return '#C5C5C5';
    case APPOINTMENT_STATUS.CHECK_IN:
      return '#19a9ec';
    case APPOINTMENT_STATUS.UN_CONFIRM:
      return '#ffff80';
    case APPOINTMENT_STATUS.CONFIRM:
      return '#d4f8fc';
    case APPOINTMENT_STATUS.VOID:
      return '#F95D59';
    case APPOINTMENT_STATUS.REFUND:
      return '#F95D59';
    case APPOINTMENT_STATUS.WAITING:
      return '#F4F4F5';
    case APPOINTMENT_STATUS.NOSHOW:
      return '#F4F4F5';
    default:
      return '#FAFAFA';
  }
};

export const appointmentGroupByFromTime = (appointments) => {
  if (appointments?.length <= 0) {
    return null;
  }

  return appointments?.reduce((previous, x) => {
    let groups = previous ?? [];
    const keyUnique = moment(x['fromTime']).format('dddd - MMM DD, YYYY');
    const isExitIdx = groups.findIndex((g) => g.key === keyUnique);

    if (isExitIdx >= 0) {
      const existItem = groups[isExitIdx];
      groups[isExitIdx] = Object.assign({}, existItem, {
        data: [...existItem.data, x],
      });
    } else {
      groups.push({ key: keyUnique, data: [x] });
    }

    return groups;
  }, []);
};

export const createFormData = (media) => {
  const data = new FormData();
  for (let i = 0; i < media.length; i++) {
    data.append('files[]', {
      uri:
        Platform.OS === 'android'
          ? media[i].uri
          : media[i].uri.replace('file://', ''),
      name: media[i].fileName ? media[i].fileName : `media-${i}.jpg`,
      type: media[i].type ? media[i].type : 'image/jpeg',
    });
  }
  return data;
};

export const createFormDataMulipleImage = (media) => {
  const data = new FormData();
  for (let i = 0; i < media.length; i++) {
    data.append('files[]', {
      uri: media[i].path,
      name: media[i].filename ? media[i].filename : `media-${i}.jpg`,
      type: media[i].mime ? media[i].mime : 'image/jpeg',
    });
  }
  return data;
};


export const slop = (size = 10) => ({
  top: size,
  left: size,
  right: size,
  bottom: size,
});

export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

export const headerPhoneGroup = [
  { label: '+1', value: '+1' },
  { label: '+84', value: '+84' },
];

export const genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

export const customerGroup = [
  { label: 'Normal', value: '0' },
  { label: 'VIP', value: '1' },
];

export const reviewTypeGroup = [
  { label: translate('All'), value: 'all' },
  { label: translate('Bad Reviews'), value: 'bad' },
  { label: translate('Good Reviews'), value: 'good' },
];

export const statusGroup = [
  { label: translate('All'), value: 'all' },
  { label: translate('Show'), value: 'show' },
  { label: translate('Hidden'), value: 'hidden' },
];

export function getTimeAvaible(staff_available_time) {
  const time12PM = `${moment().format('YYYY-MM-DD')}T12:00:00`;
  const time05PM = `${moment().format('YYYY-MM-DD')}T18:00:00`;

  const morning = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format('YYYY-MM-DD')}T${moment(obj.time, [
      'h:mm A',
    ]).format('HH:mm:ss')}`;
    return moment(timeFilter).isSameOrBefore(time12PM) && !obj.isBooked;
  });

  const afternoon = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format('YYYY-MM-DD')}T${moment(obj.time, [
      'h:mm A',
    ]).format('HH:mm:ss')}`;
    return (
      moment(timeFilter).isAfter(time12PM) &&
      moment(timeFilter).isBefore(time05PM) &&
      !obj.isBooked
    );
  });

  const evening = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format('YYYY-MM-DD')}T${moment(obj.time, [
      'h:mm A',
    ]).format('HH:mm:ss')}`;
    return moment(timeFilter).isSameOrAfter(time05PM) && !obj.isBooked;
  });

  return {
    morning,
    afternoon,
    evening,
  };
}

export function convertMinsToHrsMins(mins) {
  let minutes = mins;
  if (mins?.toString().includes("+")) {
    minutes = minutes?.toString()?.replace("+", "");
    minutes = parseInt(minutes);
  }

  if (mins?.toString().includes("-")) {
    minutes = minutes?.toString()?.replace("-", "");
    minutes = parseInt(minutes);
  }

  let h = Math.floor(minutes / 60);
  let m = minutes % 60;

  let stringConvert = `${m} ${translate("min")}`;

  if (h !== 0 && m == 0) stringConvert = `${h} hour`;
  if (h !== 0 && m !== 0) stringConvert = `${h} hour ${m} ${translate("min")}`;

  if (mins?.toString().includes("+")) {
    stringConvert = `+${stringConvert}`;
  }

  if (mins?.toString().includes("-")) {
    stringConvert = `-${stringConvert}`;
  }

  return stringConvert;
}

export const workingTimesData = {
  Monday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Tuesday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Wednesday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Thursday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Friday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Saturday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  },
  Sunday: {
    timeStart: "08:30 AM",
    timeEnd: "10:00 PM",
    isCheck: true
  }
}

export const roundNumber = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const nearestFutureMinutes = (interval, someMoment) => {
  const roundedMinutes = Math.ceil(someMoment.minute() / interval) * interval;
  return someMoment.clone().minute(roundedMinutes).second(0);
};

export const roundFloatNumber = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const getContentDate = (timeStart, timeEnd) => {
  let text = 'Select date';
  if (timeStart && timeEnd) {
    text = `${timeStart} - ${timeEnd}`;
    if (timeStart == timeEnd && timeStart == moment().format('MM/DD/YYYY')) {
      text = translate('Today');
    }
    if (
      timeStart == timeEnd &&
      timeStart == moment().subtract('days', 1).format('MM/DD/YYYY')
    ) {
      text = translate('Yesterday');
    }
    if ((timeStart == timeEnd) && (timeStart == moment().subtract("days", 1).format("MM/DD/YYYY"))) {
      text = translate("Yesterday")
    }
    if (moment().startOf("months").format("MM/DD/YYYY") == timeStart && moment().endOf("months").format("MM/DD/YYYY") == timeEnd) {
      text = translate("This month");
    }
    if (
      moment().subtract('months', 1).startOf('months').format('MM/DD/YYYY') ==
      timeStart &&
      moment().subtract('months', 1).endOf('months').format('MM/DD/YYYY') ==
      timeEnd
    ) {
      text = translate('Last month');
    }
    if (moment().startOf("isoWeeks").format("MM/DD/YYYY") == timeStart && moment().endOf("isoWeeks").format("MM/DD/YYYY") == timeEnd) {
      text = translate("This week");
    }
    if (moment().subtract("weeks", 1).startOf("isoWeeks").format("MM/DD/YYYY") == timeStart && moment().subtract('weeks', 1).endOf("isoWeeks").format("MM/DD/YYYY") == timeEnd) {
      text = translate("Last week");
    }
  }
  return text;
};

export const arrDateFilter = ["Today", "Yesterday", "This month", "Last month", "This week", "Last week"];

export const getConditionIdByTitle = (title) => {
  let id;
  switch (title) {
    case 'No condition':
      id = 1;
      break;
    case 'Using specific services':
      id = 2;
      break;
    case 'Customer birthday is within the week':
      id = 3;
      break;
    case 'Times using the service reached the quantity':
      id = 4;
      break;
    case 'The customer is the referral':
      id = 5;
      break;
    default:
      id = 1;
  }

  return id;
};

export const getConditionTitleIdById = (id) => {
  let title;
  switch (id) {
    case 1:
      title = 'No condition';
      break;
    case 2:
      title = 'Using specific services';
      break;
    case 3:
      title = 'Customer birthday is within the week';
      break;
    case 4:
      title = 'Times using the service reached the quantity';
      break;
    case 5:
      title = 'The customer is the referral';
      break;
    default:
      title = 'No condition';
  }

  return title;
};

export const getShortNameForDiscountAction = (title) => {
  let shortName = '';
  switch (title) {
    case 'Discount for specific services':
      shortName = 'specific';
      break;
    case 'Discount for whole cart':
      shortName = 'all';
      break;
    case 'Discount by category':
      shortName = 'category';
      break;
    default:
      shortName = 'all';
  }

  return shortName;
};

export const getDiscountActionByShortName = (shortName) => {
  let actionDiscount = '';
  switch (shortName) {
    case 'specific':
      actionDiscount = 'Discount for specific services';
      break;
    case 'all':
      actionDiscount = 'Discount for whole cart';
      break;
    case 'category':
      actionDiscount = 'Discount by category';
      break;
    default:
      actionDiscount = 'Discount for whole cart';
  }

  return actionDiscount;
};

export const getCredicardIcon = (cardType) => {
  let icon = '';
  let type = cardType?.toString()?.toLowerCase();
  if (`${type}`.indexOf("visa") !== -1) {
    icon = images.visaLogo;
  } else if (`${type}`.indexOf("mastercard") !== -1) {
    icon = images.masterCardLogo;
  } else if (`${type}`.indexOf("discover") !== -1) {
    icon = images.discoverLogo;
  } else if (`${type}`.indexOf("americanexpress") !== -1) {
    icon = images.american_express;
  } else if (`${type}`.indexOf("other") !== -1) {
    icon = images.other_card;
  } else {
    icon = images.other_card;
  }

  return icon;
};

export const removeAccent = (str) => {
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/ |/g, "");
  return str;
};

export const handleFileDownloaed = async (path, exportType, fileName) => {

  const dirs = RNFetchBlob.fs.dirs;
  const extension = exportType;

  const fileDownload = await RNFetchBlob.config({
    title: `${fileName}.${extension}`,
    fileCache: true,
    appendExt: `${extension}`,
    useDownloadManager: true,
    mediaScannable: true,
    notification: true,
    description: 'File downloaded by download manager.',
    path: `${dirs.DocumentDir}/${fileName}.${extension}`,
  }).fetch('GET', path, {});

  const pathFileInventory = await fileDownload.path();

  if (Platform.OS === 'ios') {
    await RNFetchBlob.ios.previewDocument(pathFileInventory)
  } else {
    const shareResponse = await Share.open({
      url: `file://${pathFileInventory}`
    });
  }
}

export const getTitleSendLinkGoogle = (value) => {
  let title = "";
  switch (value) {
    case "auto":
      title = "Automatic";
      break;
    case "manual":
      title = "Manually";
      break;
    case "off":
      title = "Off";
      break;
    default:
      title = "Manually";
  }
  return title;
};

export const stringIsEmptyOrWhiteSpaces = (str) => {
  return str == null || str == undefined || (typeof str === 'string' && str.trim().length == 0)
}

export const getStaffNameForInvoice = (profileStaffLogin = {}, basket = []) => {
  // const staffNameLogin = profileStaffLogin.displayName ? profileStaffLogin.displayName : "";

  let staffArr = [];
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].type === "Service") {
      let temptName =
        basket[i].staff && basket[i].staff.displayName
          ? basket[i].staff.displayName
          : "";
      staffArr.push(temptName);
    }
  }

  const staffs = [...new Set(staffArr)];
  return staffs.length > 0 ? staffs.join(", ") : "";
};

export const getPaymentString = (type) => {
  let method = "";
  switch (type) {
    case "harmony":
      method = "HarmonyPay";
      break;
    case "cash":
      method = "Cash";
      break;
    case "credit_card":
      method = "Credit Cards";
      break;
    case "other":
      method = "Other - Check";
      break;
    case "giftcard":
      method = "Gift Card";
      break;

    default:
      method = "Debit Cards";
  }
  return method;
};

export const getInfoFromModelNameOfPrinter = (
  printers = [],
  modelName = []
) => {
  let emulation = "";
  let widthPaper = "";
  let portName = "";

  for (let i = 0; i < printers.length; i++) {
    const printer = printers[i];
    if (printer.modelName == modelName) {
      portName = printer.portName;
      break;
    }
  }

  if (portName) {
    const tempPortName = `${modelName}`.toLowerCase();
    if (tempPortName.indexOf("pop") != -1) {
      emulation = "StarPRNT";
      widthPaper = "400";
    } else if (tempPortName.indexOf("tsp") != -1) {
      emulation = "StarGraphic";
      widthPaper = "576";
    }
  }

  return { portName, emulation, widthPaper };
};

export const getPortNameOfPrinter = (printers = [], modelName = "") => {
  let portName = "";
  for (let i = 0; i < printers.length; i++) {
    const printer = printers[i];
    if (printer.modelName == modelName) {
      portName = printer.portName;
      break;
    }
  }
  if (portName) {
  }
  return portName;
};

export const getModalNameOfPrinter = (printers, tempModalName) => {
  let modelName = "";
  for (let i = 0; i < printers.length; i++) {
    const printer = printers[i];
    if (printer.modelName == tempModalName) {
      modelName = printer.modelName;
      break;
    }
  }
  return modelName;
};

export const checkStatusPrint = async (portType = "Bluetooth") => {
  try {
    const printer = await PrintManager.getInstance().portDiscovery(portType);
    return printer ? printer : [];
  } catch (error) {
    throw error;
  }
};

export const doPrintClover = (imageUri) => {
  const { hardware } = store.getState();
  const { cloverMachineInfo } = hardware;
  const port = _.get(cloverMachineInfo, 'port') ? _.get(cloverMachineInfo, 'port') : 80
  const url = `wss://${_.get(cloverMachineInfo, 'ip')}:${port}/remote_pay`

  const printInfo = {
    imageUri,
    url,
    remoteAppId: REMOTE_APP_ID,
    appName: APP_NAME,
    posSerial: POS_SERIAL,
    token: _.get(cloverMachineInfo, 'token') ? _.get(cloverMachineInfo, 'token', '') : "",
  }
  clover.doPrintWithConnect(printInfo)
}

export const SORT_TYPE = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc',
};

export const PaymentTerminalType = {
  Clover: "Clover",
  Pax: "Pax",
  Dejavoo: "Dejavoo",
}

export const getStateId = (stateCity, value) => {
  let name = false;
  for (let i = 0; i < stateCity.length; i++) {
    if (stateCity[i].name.includes(value)) {
      name = stateCity[i].stateId;
      return name;
    }
  }
  return name;
}

export function isValidHttpUrl(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var pattern = new RegExp(regex);
  return pattern.test(str);
}