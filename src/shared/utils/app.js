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
  VOID: 'void',
  REFUND: 'refund',
  WAITING: 'waiting',
  NOSHOW: 'no show'
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
    data.append("files[]", {
      uri: Platform.OS === "android" ? media[i].uri : media[i].uri.replace("file://", ""),
      name: media[i].fileName ? media[i].fileName : `media-${i}.jpg`,
      type: media[i].type ? media[i].type : "image/jpeg",
    });
  }
  return data;
};

export const slop = (size = 10) => ({
  top: size,
  left: size,
  right: size,
  bottom: size,
})

export const guid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const headerPhoneGroup = [
  { label: "+1", value: "+1" },
  { label: "+84", value: "+84" },
];

export const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const customerGroup = [
  { label: "Normal", value: "0" },
  { label: "Vip", value: "1" },
];

export const reviewTypeGroup = [
  { label: "All reviews", value: "all" },
  { label: "Bad reviews", value: "bad" },
  { label: "Good reviews", value: "good" },
];

export const statusGroup = [
  { label: "All Status", value: "all" },
  { label: "Show", value: "show" },
  { label: "Hidden", value: "hidden" },
];


export function getTimeAvaible(staff_available_time) {
  const time12PM = `${moment().format("YYYY-MM-DD")}T12:00:00`;
  const time05PM = `${moment().format("YYYY-MM-DD")}T17:00:00`;

  const morning = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isSameOrBefore(time12PM) && !(obj.isBooked);
  });

  const afternoon = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isAfter(time12PM) && moment(timeFilter).isBefore(time05PM) && !(obj.isBooked);
  });

  const evening = staff_available_time.filter((obj) => {
    const timeFilter = `${moment().format("YYYY-MM-DD")}T${moment(obj.time, ["h:mm A"]).format(
      "HH:mm:ss",
    )}`;
    return moment(timeFilter).isSameOrAfter(time05PM) && !(obj.isBooked);
  });

  return {
    morning,
    afternoon,
    evening,
  };
}



export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  // h = h < 10 ? '0' + h : h;
  // m = m < 10 ? '0' + m : m;
  if (h !== 0 && m == 0) return `${h} hour`;
  if (h !== 0 && m !== 0) return `${h} hour ${m} min`;
  return `${m} min`;
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
}