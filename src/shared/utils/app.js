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
