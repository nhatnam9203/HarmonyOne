import moment from 'moment';
import _ from 'lodash';
import { colors } from '../themes/variables';
import { SORT_TYPE } from './app';
import { guid } from "./app";

export const DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const BIRTH_DAY_DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const DATE_SHOW_FORMAT_STRING = 'LL'; // August 30, 2021
export const DATE_TIME_SHOW_FORMAT_STRING = 'LLL'; // August 30, 2021 4:14 PM
export const DATE_TIME_REQUEST_FORMAT_STRING = 'MM/DD/YYYY';
export const TIME_APPOINTMENT_FORMAT = 'LT'; // 4:14 PM

export const dateToFormat = (
  d = new Date(),
  formatString = DATE_FORMAT_STRING,
) => {
  return moment(d).format(formatString);
};

export const formatPhoneNumber = phoneNumberString => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');

  // Format Phone Us
  var matchUS = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (matchUS) {
    var intlUSCode = matchUS[1] ? '+1 ' : '';
    return [
      intlUSCode,
      '(',
      matchUS[2],
      ') ',
      matchUS[3],
      '-',
      matchUS[4],
    ].join('');
  }

  // Format Phone Vietnamese
  var matchVN = cleaned.match(/^(84|)?(\d{3})(\d{3})(\d{3})$/);
  if (matchVN) {
    var intlVNCode = matchVN[1] ? '+84 ' : '';
    return [intlVNCode, matchVN[2], '-', matchVN[3], '-', matchVN[4]].join('');
  }

  return null;
};

export const formatNumberFromCurrency = currency => {
  return Number(`${currency}`.replace(/[^0-9.-]+/g, ''));
};

export const formatWithMoment = (data, key) => {
  const temtFormatDate = moment.parseZone(data).format(key);
  return temtFormatDate != "Invalid date" ? temtFormatDate : "";
};

export const formatMoney = (
  number,
  decimalCount = 2,
  decimal = '.',
  thousands = ',',
) => {
  let amount = formatNumberFromCurrency(number) || 0;
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount)).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
        : '')
    );
  } catch (e) { }
};

export const formatMoneyWithUnit = (amount, unit = '$') => {
  if (unit === '$') {
    if (!amount) return unit + ' 0.00';
    return unit + ' ' + formatMoney(amount);
  }

  if (unit === 'VND') {
    if (!amount) return '0.00 ' + unit;
    return formatMoney(amount) + ' ' + unit;
  }

  return formatMoney(amount || 0);
};

export const convertStatus = {
  checkin: 'CHECK-IN',
  waiting: 'WAITING',
  paid: 'PAID',
  void: 'VOID',
  refund: 'REFUND',
  cancel: 'CANCEL',
  confirm: 'CONFIRMED',
  unconfirm: 'UNCONFIRM',
};

export const convertColorByStatus = status => {
  let color = colors.ocean_blue;

  switch (status) {
    case 'checkin':
      color = colors.ocean_blue;
      break;

    case 'waiting':
      color = '#dddddd';
      break;

    case 'void':
      color = '#dddddd';
      break;

    case 'refund':
      color = '#dddddd';
      break;

    case 'cancel':
      color = 'red';
      break;

    case 'paid':
      color = '#50CF25';
      break;

    case 'confirm':
      color = '#404040';
      break;

    case 'unconfirm':
      color = '#404040';
      break;

    default:
      break;
  }
  return color;
};

export const dateCompare = (a, b) => {
  // check valid date -> sort date
  if (moment(a).isValid() && moment(b).isValid()) {
    return new Date(a) - new Date(b);
  }
  return a.toString().localeCompare(b.toString());
};

export const sortByDate = (items, sort, sortKey) => {
  let sortList = [...items]; // clone
  if (sortKey && sortList?.length > 0) {
    return sortList.sort((a, b) => {
      if (sort === SORT_TYPE.DESC) {
        return dateCompare(a[sortKey], b[sortKey]);
      } else if (sort === SORT_TYPE.ASC) {
        return dateCompare(b[sortKey], a[sortKey]);
      } else return 0;
    });
  }
  return sortList;
};


export const timeAvaiableRaw = [
  {
    "id": guid(),
    "isBooked": false,
    "time": "08:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "08:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "08:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "08:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "09:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "09:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "09:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "09:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "10:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "10:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "10:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "10:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "11:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "11:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "11:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "11:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "12:00"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "12:15"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "12:30"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "12:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "13:00"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "13:15"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "13:30"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "13:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "14:00"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "14:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "14:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "14:45"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "15:00"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "15:15"
  },

  {
    "id": guid(),
    "isBooked": false,
    "time": "15:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "15:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "16:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "16:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "16:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "16:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "17:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "17:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "17:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "17:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "18:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "18:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "18:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "18:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "19:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "19:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "19:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "19:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "20:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "20:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "20:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "20:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "21:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "21:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "21:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "21:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "22:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "22:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "22:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "22:45"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "23:00"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "23:15"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "23:30"
  },
  {
    "id": guid(),
    "isBooked": false,
    "time": "23:45"
  },
];

export const translateManual = (language, value) => {
  let translated = value;
  if (language == "vi") {
    switch (value) {
      case "Monday":
      case "Mon":
        translated = "Th??? hai";
        break;

      case "Tuesday":
      case "Tue":
        translated = "Th??? ba";
        break;

      case "Wednesday":
      case "Wed":
        translated = "Th??? t??";
        break;

      case "Thursday":
      case "Thu":
        translated = "Th??? n??m";
        break;

      case "Friday":
      case "Fri":
        translated = "Th??? s??u";
        break;

      case "Saturday":
      case "Sat":
        translated = "Th??? b???y";
        break;

      case "Sunday":
      case "Sun":
        translated = "Ch??? nh???t";
        break;

      case "Saturday":
      case "complete":
        translated = "ho??n th??nh";
        break;

      case "incomplete":
        translated = "ch??a ho??n th??nh";
        break;

      case "paid":
      case "PAID":
        translated = "???? tr??? ti???n";
        break;

      case "void":
      case "VOID":
        translated = "v?? hi???u";
        break;

      case "refund":
      case "REFUND":
        translated = "???? ho??n ti???n";
        break;

      case "cancel":
      case "CANCEL":
        translated = "hu???";
        break;

      case "transaction fail":
      case "TRANSACTION FAIL":
        translated = "giao d???ch l???i";
        break;

      case "check-in":
      case "CHECK-IN":
        translated = "???? t???i ti???m";
        break;

      case "unconfirm":
      case "UNCONFIRM":
        translated = "Ch??a x??c nh???n";
        break;

      case "confirm":
      case "CONFIRM":
        translated = "????? x??c nh???n";
        break;

      case "waiting":
      case "WAITING":
        translated = "??ang ?????i";
        break;

      case "Staff":
      case "staff":
        translated = "Nh??n vi??n";
        break;

      case "Admin":
      case "admin":
        translated = "Qu???n tr??? vi??n";
        break;

      case "Manager":
      case "manager":
        translated = "Qu???n l??";
        break;


      case "Giftcard":
      case "Gift card":
        translated = "Th??? qu?? t???ng";
        break;

      case "Credit Card":
      case "Credit card":
        translated = "Th??? t??n d???ng";
        break;

      case "Cash":
      case "Cash":
        translated = "Ti???n m???t";
        break;

      case "Other":
      case "other":
        translated = "Kh??c";
        break;

      default:
        break;
    };
  };

  return translated;

}