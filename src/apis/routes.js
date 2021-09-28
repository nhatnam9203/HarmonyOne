import { guid } from "@shared/utils";

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

export const getStaffById = (staffId) => ({
  params: {
    url: `/staff/${staffId}`,
    method: 'GET',
  },
});

export const updateStaff = (data, staffId) => ({
  queryId: 'updateStaff',
  params: {
    url: `/staff/${staffId}`,
    method: 'PUT',
    data,
  },
});

export const uploadAvatarStaff = (data) => ({
  queryId: 'uploadAvatarStaff',
  params: {
    url: `/file?category=avatar`,
    method: 'POST',
    data,
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
  queryId: `addNewCustomer`,
  params: {
    url: '/customer',
    method: 'POST',
    data,
  },
});

export const editCustomer = (data, customerId) => ({
  queryId: `editCustomer`,
  params: {
    url: `/customer/${customerId}`,
    method: 'PUT',
    data,
  },
});

export const getCustomerInfoById = (customerId) => ({
  queryId: `getCustomerInfoById`,
  params: {
    url: `/customer/${customerId}`,
    method: 'GET',
  },
});

export const deleteCustomer = (customerId) => ({
  queryId: `deleteCustomer`,
  params: {
    url: `/customer/${customerId}`,
    method: 'DELETE',
  },
});

export const getPastAppointmentByCustomer = (customerId, page) => ({
  queryId: `getPastAppointmentByCustomer`,
  params: {
    url: `appointment/getPastByCustomer/${customerId}?page=${page}`,
    method: 'GET',
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

export const editCategory = (data, categoryId) => ({
  queryId: 'editCategory',
  params: {
    url: `/category/${categoryId}`,
    method: 'PUT',
    data
  },
});

export const archiveCategory = (data, categoryId) => ({
  queryId: 'archiveCategory',
  params: {
    url: `/category/archive/${categoryId}`,
    method: 'PUT',
    data
  },
});

export const restoreCategory = (data, categoryId) => ({
  queryId: 'restoreCategory',
  params: {
    url: `/category/restore/${categoryId}`,
    method: 'PUT',
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


/**
 * REVIEW
 */

export const getSummaryReview = (merchantId) => ({
  queryId: 'getSummaryReview',
  params: {
    url: `Rating/merchant/summary/${merchantId}`,
    method: 'GET',
  }
});

export const getListReview = (status = "all", review = "all", page = 1) => ({
  queryId: 'getListReview',
  params: {
    url: `rating/merchant/filters?status=${status}&review=${review}&page=${page}`,
    method: 'GET',
  }
});

export const showRating = (id) => ({
  queryId: 'showRating',
  params: {
    url: `rating/restore/${id}`,
    method: 'PUT',
    data: {},
  },
})

export const hideRating = (id) => ({
  queryId: 'hideRating',
  params: {
    url: `rating/archive/${id}`,
    method: 'PUT',
    data: {}
  },
})

