export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getColorForStatus = (status) => {
  switch (`${status}`.toLowerCase()) {
    case 'paid':
      return '#4AD100';
    case 'pending':
      return '#0764B0';
    case 'complete':
      return '#0035FF';
    case 'cancel':
      return '#C5C5C5';
    case 'checkin':
      return '#19a9ec';
    case 'unconfirm':
      return '#ffff80';
    case 'confirm':
      return '#d4f8fc';
    default:
      return '#fff';
  }
};
