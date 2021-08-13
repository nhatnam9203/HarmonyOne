import moment from 'moment';
import _ from 'lodash';

export const DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const BIRTH_DAY_DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const DATE_SHOW_FORMAT_STRING = 'LL';
export const DATE_TIME_SHOW_FORMAT_STRING = 'LLL';
export const DATE_TIME_REQUEST_FORMAT_STRING = 'YYYY-MM-DD';
export const TIME_APPOINTMENT_FORMAT = 'LT';

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
};
