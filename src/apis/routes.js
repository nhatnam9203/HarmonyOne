export const getAppointmentStaffByDate = (staffId, date) => ({
  queryId: 'appointmentByStaffDate',
  params: {
    url: `/appointment/staffByDate/${staffId}?date=${date}`,
    method: 'GET',
  },
});

export const staffLoginRequest = (merchantID, pinCode) => ({
  params: {
    url: 'staff/login',
    method: 'POST',
    data: {
      merchantCode: merchantID,
      staffPin: pinCode,
    },
  },
});

export const merchantLogin = (merchantID) => ({
  params: {
    url: `merchant/login/${merchantID}`,
    method: 'POST',
  },
});
