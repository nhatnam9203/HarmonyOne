import moment from 'moment';
import _ from 'lodash';

export const DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const BIRTH_DAY_DATE_FORMAT_STRING = 'MM/DD/YYYY';
export const DATE_SHOW_FORMAT_STRING = 'LL';
export const DATE_TIME_SHOW_FORMAT_STRING = 'LLL';

export const dateToFormat = (
  d = new Date(),
  formatString = DATE_FORMAT_STRING,
) => {
  return moment(d).format(formatString);
};
