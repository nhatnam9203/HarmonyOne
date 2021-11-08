import moment from 'moment';
import _ from 'lodash';
import { colors } from '../themes/variables';
import { SORT_TYPE } from './app';

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
  } catch (e) {}
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

// export const roundNumber = (num = 0)=> {
//   const r = (Math.round(num * 100) / 100).toFixed(2);
//   return r ?? 0;
// };

// export const roundFloatNumber = num => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };
