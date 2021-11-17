import { guid } from "@shared/utils";

export const merchantLogin = (merchantID, data) => ({
  params: {
    url: `/merchant/login/${merchantID}`,
    method: 'POST',
    data
  },
});



/**
 * STAFF
 */

export const forgotPincode = (data) => ({
  queryId: 'forgotPincode',
  params: {
    url: `/staff/forgotpin`,
    method: 'POST',
    data
  },
});

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

export const staffLogoutRequest = (data) => ({
  params: {
    url: '/merchant/logout',
    method: 'PUT',
    data: {}
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


export const addStaff = (data) => ({
  queryId: 'addStaff',
  params: {
    url: `staff?api-version=1.1`,
    method: 'POST',
    data,
  }
});

export const getStaffById = (staffId, merchantId) => ({
  queryId: 'getStaffById',
  params: {
    url: `/staff/${staffId}`,
    method: 'GET',
  },
});

export const updateStaff = (staffId, data) => ({
  queryId: 'updateStaff',
  params: {
    url: `staff/${staffId}?api-version=1.1`,
    method: 'PUT',
    data
  },
});

export const getStaffByDate = (merchantId, date) => ({
  queryId: 'getStaffByDate',
  params: {
    url: `staff/getbydate/${merchantId}?date=${date}`,
    method: 'GET',
  },
});

export const getStaffOfService = (serviceId, date) => ({
  queryId: 'getStaffOfService',
  params: {
    url: `/staff/byService/${serviceId}`,
    method: 'GET',
  },
});

export const staffGetAvaiableTime = (staffId, data) => ({
  queryId: 'staffGetAvaiableTime',
  params: {
    url: `staff/getavailabletime/${staffId}`,
    method: 'PUT',
    data,
  },
});

export const getStaffByMerchant = (merchantId) => ({
  queryId: 'getStaffByMerchant',
  params: {
    url: `staff/getbymerchant/${merchantId}`,
    method: 'GET',
  },
});

/**
 * APPOINTMENTS
 */

export const getPromotionByAppointment = (appointmentId) => ({
  queryId: 'getPromotionByAppointment',
  params: {
    url: `appointment/promotion/${appointmentId}`,
    method: 'GET',
  },
});

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

export const updateAppointment = (appointmentId, data) => ({
  queryId: 'updateAppointment',
  params: {
    url: `/appointment/${appointmentId}`,
    method: 'PUT',
    data
  },
});

export const updateAppointmentStatusRequest = (appointmentId, data) => ({
  queryId: 'updateAppointmentStatusRequest',
  params: {
    url: `appointment/updatestatus/${appointmentId}`,
    method: 'PUT',
    data
  },
});

export const getAppointmentById = (appointmentId) => ({
  queryId: 'getAppointmentById',
  params: {
    url: `/appointment/${appointmentId}`,
    method: 'GET',
  },
});

export const appointmentUpdateNote = (appointmentId, data) => ({
  queryId: 'appointmentUpdateNote',
  params: {
    url: `/appointment/note/${appointmentId}`,
    method: 'PUT',
    data // { notes : example }
  },
});

export const addAppointment = (data) => ({
  queryId: 'addAppointment',
  params: {
    url: `/appointment`,
    method: 'POST',
    data,
  },
});

export const getGroupAppointmentById = (appointmentId) => ({
  queryId: 'getGroupAppointmentById',
  params: {
    url: `appointment/getGroupById/${appointmentId}`,
    method: 'GET',
  },
});

export const removeItemAppointment = (appointmentId, data) => ({
  queryId: 'removeItemAppointment',
  params: {
    url: `appointment/removeitem/${appointmentId}`,
    method: 'PUT',
    data
  },
});

export const addItemIntoAppointment = (appointmentId, data) => ({
  queryId: 'addItemIntoAppointment',
  params: {
    url: `appointment/additem/${appointmentId}`,
    method: 'PUT',
    data
  },
});

/**
 * BLOCK TIMES
 */

export const getAppointmentByDate = (date) => ({
  queryId: 'getAppointmentByDate',
  params: {
    // url: `blocktime?workingdate=${date}`,
    url: `appointment/date/${date}`,
    method: 'GET',
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

export const sendGoogleReviewLink = (customerId = 0, merchantId = 0) => ({
  queryId: `sendGoogleReviewLink`,
  params: {
    url: `customer/sendReviewLink?customerId=${customerId}&merchantId=${merchantId}`,
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
  queryId: 'addCategory',
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

export const addProduct = (data) => ({
  queryId: 'addProduct',
  params: {
    url: `/product`,
    method: 'POST',
    data
  },
});

export const editProduct = (data, productId) => ({
  queryId: 'editProduct',
  params: {
    url: `/product/${productId}`,
    method: 'PUT',
    data
  },
});

export const exportProduct = (merchantId, isNeedToOrder, exportType) => ({
  queryId: 'exportProduct',
  params: {
    url: `product/export?merchantId=${merchantId}&isNeedToOrder=${isNeedToOrder}&type=${exportType}`,
    method: 'GET',
  },
});

export const checkSkuNumber = (sku) => ({
  queryId: 'checkSkuNumber',
  params: {
    url: `product/checksku?sku=${sku}`,
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

export const addNewExtra = (data) => ({
  params: {
    url: '/extra',
    method: 'POST',
    data,
  },
});

export const editExtra = (data, extraId) => ({
  params: {
    url: `/extra/${extraId}`,
    method: 'PUT',
    data,
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


/**
 * MARKETING
 */
export const getPromotionMerchant = () => ({
  queryId: 'getPromotionMerchant',
  params: {
    url: `/MerchantPromotion?api-version=1.2`,
    method: 'GET',
  }
});

export const getMarketPlaces = (page = 1) => ({
  queryId: 'getMarketPlaces',
  params: {
    url: `/MarketPlace?page=${page}`,
    method: 'GET',
  }
});

export const getSmsInformation = (conditionId) => ({
  queryId: 'getSmsInformation',
  params: {
    url: `MerchantPromotion/smsLength/${conditionId}?api-version=1.2`,
    method: 'GET',
  }
});

export const createNewCampaign = (data) => ({
  queryId: 'createNewCampaign',
  params: {
    url: `MerchantPromotion?api-version=1.2`,
    method: 'POST',
    data,
  }
});

export const updatePromotionById = (promotionId, data) => ({
  queryId: 'updatePromotionById',
  params: {
    url: `MerchantPromotion/${promotionId}?api-version=1.2`,
    method: 'PUT',
    data,
  }
});

export const getPromotionDetailById = (promotionId) => ({
  queryId: 'getPromotionDetailById',
  params: {
    url: `MerchantPromotion/${promotionId}?api-version=1.2`,
    method: 'GET',
  }
});

export const disablePromotionById = (promotionId) => ({
  queryId: 'disablePromotionById',
  params: {
    url: `MerchantPromotion/disable/${promotionId}?api-version=1.2`,
    method: 'PUT',
    data: {}
  }
});

export const deletePromotion = (promotionId) => ({
  queryId: 'disablePromotionById',
  params: {
    url: `MerchantPromotion/${promotionId}`,
    method: 'DELETE',
    data : {}
  }
});

export const enablePromotionById = (promotionId) => ({
  queryId: 'enablePromotionById',
  params: {
    url: `MerchantPromotion/enable/${promotionId}?api-version=1.2`,
    method: 'PUT',
    data: {}
  }
});

export const getPromotionAppointment = (appointmentId) => ({
  queryId: 'getPromotionAppointment',
  params: {
    url: `appointment/promotion/${appointmentId}`,
    method: 'GET',
  }
});

export const customPromotion = (appointmentId, data) => ({
  queryId: 'customPromotion',
  params: {
    url: `appointment/custompromotion/${appointmentId}`,
    method: 'PUT',
    data
  }
});

export const addPromotionNote = (appointmentId, data) => ({
  queryId: 'addPromotionNote',
  method: "POST",
  params: {
    url: `appointment/promotion/note/${appointmentId}`,
    method: 'POST',
    data
  }
});


/**
 * MERCHANT
 */


 export const forgotPasswpordMerchant = (merchantId) => ({
  queryId: 'forgotPasswpordMerchant',
  params: {
    url: `/Merchant/forgotpassword?email=${merchantId}`,
    method: 'GET',
  }
});


export const getMerchantById = (merchantId) => ({
  queryId: 'getMerchantById',
  params: {
    url: `merchant/${merchantId}`,
    method: 'GET',
  }
});


export const addBannerMerchant = (data) => ({
  queryId: 'addBannerMerchant',
  params: {
    url: `merchantbanner`,
    method: 'POST',
    data
  }
});


export const getBannerMerchant = (merchantId) => ({
  queryId: 'getBannerMerchant',
  params: {
    url: `merchantbanner/getbymerchant/${merchantId}`,
    method: 'GET',
  }
});

export const deleteBannersMerchant = (data) => ({
  queryId: 'deleteBannersMerchant',
  params: {
    url: `merchantbanner/multiple`,
    method: 'DELETE',
    data
  }
});

// type: 'ADD_BANNER_WITH_INFO',
// method: 'POST',
// token: true,
// api: `merchantbanner`,
// body: {
//     ...action.infoBanner,
//     fileId: responses?.data?.fileId || 0
// },
// merchantId: action.merchantId



/**
 * NOTIFICATION
 */

export const getNotification = (page) => ({
  queryId: 'getNotification',
  params: {
    url: `notification?page=${page}&row=20`,
    method: 'GET',
  }
});

export const getCountUnReadOfNotification = () => ({
  queryId: 'getCountUnReadOfNotification',
  params: {
    url: `notification/countUnRead?api-version=2.0`,
    method: 'GET',
  }
});

export const maskNotiAsReadById = (notiId) => ({
  queryId: 'maskNotiAsReadById',
  params: {
    url: `notification/view/${notiId}`,
    method: 'PUT',
    data: {}
  }
});

export const readAllNotification = (page) => ({
  queryId: 'readAllNotification',
  params: {
    url: `notification/view/all`,
    method: 'PUT',
    data: {}
  }
});

export const changeStylist = (appointmentId, data) => ({
  queryId: 'changeStylist',
  method: "POST",
  params: {
    url: `appointment/tip/${appointmentId}`,
    method: 'PUT',
    data
  }
});


/**
 * PAYMENT
 */

export const selectPaymentMethod = (checkoutGroupId, data) => ({
  queryId: 'selectPaymentMethod',
  params: {
    url: `appointment/selectpaymentmethod/${checkoutGroupId}`,
    method: 'PUT',
    data
  }
});

export const checkoutSubmit = (appointmentId) => ({
  queryId: 'checkoutSubmit',
  params: {
    url: `checkout/submit/${appointmentId}`,
    method: 'PUT',
    data: {}
  }
});

export const checkoutAppointment = (appointmentId) => ({
  queryId: 'checkoutAppointment',
  params: {
    url: `appointment/checkout/${appointmentId}`,
    method: 'PUT',
    data: {}
  }
});

export const checkGiftCard = (serialNumber) => ({
  queryId: 'checkGiftCard',
  params: {
    url: `giftcard/serialNumber/${serialNumber}?isActive=${true}`,
    method: 'GET',
  }
});

export const cancelHarmonyPayment = (payAppointmentId, data) => ({
  queryId: 'cancelHarmonyPayment',
  params: {
    url: `appointment/cancelmethod/${payAppointmentId}`,
    method: 'PUT',
    data
  }
});


export const submitPaymentWithCreditCard = (merchantId, 
  responseData, checkoutPaymentId, moneyUserGiveForStaff,
  paymentTerminal, paymentData) => ({
    
    queryId: 'submitPaymentWithCreditCard',
    params: {
      url: `paymentTransaction`,
      method: 'POST',
      data: {
        merchantId,
        userId: 0,
        title: "pax",
        responseData,
        checkoutPaymentId: checkoutPaymentId,
        paymentTerminal,
        paymentData
      }
    }
})

/**
 * MERCHANT SETTING
 */


export const merchantSetting = (data) => ({
  queryId: 'merchantSetting',
  params: {
    url: `merchant/setting`,
    method: 'PUT',
    data
  }
});

/* 
* INVOICE
*/

export const getListInvoicesByMerchant = (
  key = "", method = "", status = "", timeStart = "", timeEnd = "", quickFilter = "", page = 1,
) => ({
  queryId: 'getListInvoicesByMerchant',
  params: {
    url: `checkout?page=${page}&method=${method}&status=${status}&timeStart=${timeStart}&timeEnd=${timeEnd}&key=${key}&quickFilter=${quickFilter}&row=10&api-version=1.1`,
    method: 'GET',
  }
});

export const getInvoiceDetail = (checkoutId) => ({
  queryId: 'getInvoiceDetail',
  params: {
    url: `checkout/${checkoutId}`,
    method: 'GET',
  }
});

export const changeStatustransaction = (checkoutId, data) => ({
  queryId: 'changeStatustransaction',
  params: {
    url: `checkout/paymentvoidrefundtransaction/${checkoutId}`,
    method: 'PUT',
    data
  }
});

export const getCustomerCanbeSendPromotion = (merchantPromotionId, merchantId) => ({
  queryId: 'canbesendpromotion',
  params: {
    url: `customer/canbesendpromotion?merchantPromotionId=${merchantPromotionId}&merchantId=${merchantId}`,
    method: 'GET',
  }
});


/* 
* SETTLEMENT
*/
export const getBatchHistory = (key = "", timeStart = "", timeEnd = "", quickFilter = "", page = 1) => ({
  queryId: 'getBatchHistory',
  params: {
    url: `settlement/search?key=${key}&timeStart=${timeStart}&timeEnd=${timeEnd}&quickFilter=${quickFilter}&page=${page}&row=10&api-version=1.1`,
    method: 'GET',
  }
});

export const getStaffSalesBySettlementId = (settlementId = 0) => ({
  queryId: 'getStaffSalesBySettlementId',
  params: {
    url: `appointment/staffSales/getBySettlement/${settlementId}`,
    method: 'GET',
  }
});

export const getListStaffsSales = (terminalID) => ({
  queryId: 'getListStaffsSales',
  params: {
    url: `appointment/staffSales?sn=${terminalID}`,
    method: 'GET',
  }
});

export const getListGiftCardSales = (terminalID = null) => ({
  queryId: 'getListGiftCardSales',
  params: {
    url: `settlement/waiting/giftCardSales?sn=${terminalID}`,
    method: 'GET',
  }
});

export const getSettlementWating = (terminalID = null, paymentTerminal = "pax") => ({
  queryId: 'getSettlementWating',
  params: {
    url: `settlement/waiting?sn=null&paymentTerminal=pax`,
    method: 'GET',
  }
});

export const getTransactions = (timeStart = "", timeEnd = "", key = "", quickFilter = "", page = 1) => ({
  queryId: 'getTransactions',
  params: {
    url: `settlement/transaction?status=&timeStart=${timeStart}&timeEnd=${timeEnd}&key=${key}&quickFilter=${quickFilter}&page=${page}`,
    method: 'GET',
  }
});

export const getGiftCardSalesBySettlementId = (settlementId = 0) => ({
  queryId: 'getGiftCardSalesBySettlementId',
  params: {
    url: `settlement/giftCardSales/${settlementId}`,
    method: 'GET',
  }
});


/* 
* REPORT
*/

export const reportGetStaffSalary = (params, page = 1) => ({
  queryId: 'reportGetStaffSalary',
  params: {
    url: `staff/salary?${params}&page=${page}`,
    method: 'GET',
  }
});

export const sendFeedback = (data) => ({
  queryId: 'sendFeedback',
  params: {
    url: `feedback`,
    method: 'POST',
    data
  }
});


export const activeFirebase = (data) => ({
  queryId: 'activeFirebase',
  params: {
    url: `merchant/setupFireBase`,
    method: 'PUT',
    data
  }
});

export const getStateCity = () => ({
  queryId: 'getStateCity',
  params: {
    url: `state`,
    method: 'GET',   
  }
});

