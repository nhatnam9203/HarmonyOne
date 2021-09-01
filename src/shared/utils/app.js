import moment from 'moment';

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
    default:
      return '#5C5C5C';
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
