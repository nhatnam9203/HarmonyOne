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

export const appointmentStaffByTypeRequest = (staffId) => ({
  queryId: 'appointmentStaffByTypeRequest',
  params: {
    url: `/appointment/staff/${staffId}`,
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


/**
 * CUSTOMER
 */
export const getListCustomer = (key = '', page = 1) => ({
  queryId: 'getListCustomer',
  params: {
    url: `/customer/search?key=${key}&page=${page}`,
    method: 'GET',
  },
});

export const addNewCustomer = (data) => ({
  params: {
    url: '/customer',
    method: 'POST',
    data,
  },
});



/**
 * SERVICE
 */
export const getService = () => ({
  queryId: 'getService',
  params: {
    url: `/service`,
    method: 'GET',
  },
});

export const getServiceByCategory = () => ({
  queryId: 'getServiceByCategory',
  params: {
    url: `/service/getbycategory`,
    method: 'GET',
  },
});

export const addNewService = (data) => ({
  params: {
    url: '/service',
    method: 'POST',
    data,
  },
});

export const editService = (data, serviceId) => ({
  params: {
    url: `/service/${serviceId}`,
    method: 'PUT',
    data,
  },
});


/**
 * CATEGORY
 */
export const getCategoryByMerchant = (merchantId) => ({
  queryId: 'getCategoryByMerchant',
  params: {
    url: `/category/getbymerchant/${merchantId}`,
    method: 'GET',
  },
});

export const addCategory = (data) => ({
  queryId: 'getCategory',
  params: {
    url: `/category`,
    method: 'POST',
    data
  },
});


/**
 * PRODUCT
 */
export const getProduct = () => ({
  queryId: 'getProduct',
  params: {
    url: `/product`,
    method: 'GET',
  },
});



/**
 * EXTRA
 */
export const getExtra = () => ({
  queryId: 'getExtra',
  params: {
    url: `/extra`,
    method: 'GET',
  },
});

