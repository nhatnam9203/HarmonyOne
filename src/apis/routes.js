export const merchantLogin = (merchantID) => ({
  params: {
    url: `/merchant/login/${merchantID}`,
    method: 'POST',
  },
});

/**
 * STAFF
 */

export const staffLoginRequest = (merchantID, pinCode) => ({
  params: {
    url: '/staff/login',
    method: 'POST',
    data: {
      merchantCode: merchantID,
      staffPin: pinCode,
    },
  },
});

export const staffLogoutRequest = () => ({
  params: {
    url: '/staff/logout',
    method: 'POST',
  },
});

/**
 * APPOINTMENTS
 */

export const appointmentStaffByDateRequest = (staffId, date) => ({
  queryId: 'appointmentStaffByDateRequest',
  params: {
    url: `/appointment/staffByDate/${staffId}?date=${date}`,
    method: 'GET',
  },
});

export const appointmentByIDRequest = (appointmentId) => ({
  queryId: 'appointmentByIDRequest',
  params: {
    url: `/appointment/${appointmentId}`,
    method: 'GET',
  },
});

export const updateAppointmentByIDRequest = (appointmentId) => ({
  queryId: 'updateAppointmentByIDRequest',
  params: {
    url: `/appointment/${appointmentId}`,
    method: 'PUT',
  },
});

export const updateAppointmentStatusRequest = (appointmentId) => ({
  queryId: 'updateAppointmentStatusRequest',
  params: {
    url: `appointment/updatestatus/${appointmentId}`,
    method: 'PUT',
  },
});