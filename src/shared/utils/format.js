import moment from 'moment';
import _ from 'lodash';
import { colors } from "../themes/variables";

export const DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const BIRTH_DAY_DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const DATE_SHOW_FORMAT_STRING = 'LL'; // August 30, 2021
export const DATE_TIME_SHOW_FORMAT_STRING = 'LLL'; // August 30, 2021 4:14 PM
export const DATE_TIME_REQUEST_FORMAT_STRING = 'YYYY-MM-DD';
export const TIME_APPOINTMENT_FORMAT = 'LT'; // 4:14 PM

export const dateToFormat = (
  d = new Date(),
  formatString = DATE_FORMAT_STRING,
) => {
  return moment(d).format(formatString);
};

export const formatPhoneNumber = (phoneNumberString) => {
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

export const formatNumberFromCurrency = (currency) => {
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
  "checkin": "CHECK-IN",
  "waiting": "WAITING",
  "paid": "PAID",
  "void": "VOID",
  "refund": "REFUND",
  "cancel": "CANCELLED",
  "confirm": "CONFIRMED",
  "unconfirm": "UNCONFIRM",
}

export const convertColorByStatus = (status) => {
  let color = colors.ocean_blue;

  switch (status) {
    case "checkin":
      color = colors.ocean_blue;
      break;

    case "waiting":
      color = "#dddddd";
      break;

    case "void":
      color = "#dddddd";
      break;

    case "refund":
      color = "#dddddd";
      break;

    case "cancel":
      color = "red";
      break;

    case "paid":
      color = "#50CF25";
      break;

    case "confirm":
      color = "#404040";
      break;

    case "unconfirm":
      color = "#404040";
      break;

    default:
      break;
  }
  return color;
}