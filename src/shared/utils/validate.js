import { isMoment } from 'moment';

export const isToday = (someDate) => {
  if (!someDate) return false;

  const today = new Date();
  let d = someDate;

  if (isMoment(someDate)) {
    d = someDate?.toDate();
  }

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};
