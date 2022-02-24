import React from "react";
import { getStaffOfService, useAxiosQuery, staffGetAvaiableTime, useAxiosMutation } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const useProps = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const isEditItem = route?.params?.isEditItem;
  const extrasEdit = route?.params?.extrasEdit;

  const serviceRef = React.useRef(); // detect go back;
  const extrasRef = React.useRef();

  const inputPriceRef = React.useRef();


  const {
    bookAppointment: {
      servicesBooking = [],
      extrasBooking = [],
      isQuickCheckout,
      isAddMore,
      dayBooking,
      timeBooking,
    },
    auth: { staff },
    staff: { staffListByMerchant = [], staffsByDate = [] },
  } = useSelector(state => state);

  const staffSelectedAppointmentScreen = useSelector(state => state.appointment.staffSelected);

  const [durationService, setDurationService] = React.useState(0);
  const [extrasService, setExtrasService] = React.useState([]);

  const [price, setPrice] = React.useState("");
  const [isEditPrice, setStatusEditPrice] = React.useState(false);


  const getStaffSelected = () => {
    return staffListByMerchant?.find(s => s?.staffId == staff?.staffId);
  }

  const roleName = staff?.roleName?.toString()?.toLowerCase();


  React.useEffect(() => {

    if (!isEditItem) {
      setPrice(item?.price);
      let extras = item?.extras || [];
      extras = extras.map(ex => ({ ...ex, checked: false, serviceId: item?.serviceId }))
      setExtrasService(extras);
      setDurationService(item?.duration);
    }

    else {
      let extras = item?.extras || [];
      let tempExtrasEdit = extrasEdit || [];

      tempExtrasEdit = tempExtrasEdit.filter(ex => ex.checked);
      extras = extras.map(ex => ({ ...ex, checked: false, serviceId: item?.serviceId }));

      for (let i = 0; i < extras.length; i++) {
        for (const ex of tempExtrasEdit) {
          if (ex.extraId == extras[i].extraId) {
            extras[i].checked = true;
          }
        }
      }

      setExtrasService(extras);
      setDurationService(item?.duration);
      setPrice(item?.price);

    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (serviceRef?.current) {
        // console.log("----- on back ----")
        setDurationService(serviceRef?.current?.duration);
        setPrice(serviceRef?.current?.price);
      }
    });

    return unsubscribe;
  }, []);


  const editService = () => {
    let itemServiceEdit = {
      service: serviceRef.current,
      duration: durationService,
      price,
    }
    if (isEditItem) {
      itemServiceEdit = {
        service: item,
        duration: durationService,
        price,
      }
    }
    dispatch(bookAppointment.editService(itemServiceEdit));
    dispatch(bookAppointment.updateExtrasBooking(extrasService));
    serviceRef.current = itemServiceEdit.service;
  }


  const addService = () => {
    if (serviceRef?.current) {
      editService();
      return;
    }

    /* add service */
    let temp = [...servicesBooking];
    const tempItem = {
      ...item,
      duration: durationService,
      price
    };
    serviceRef.current = tempItem;
    temp.push(tempItem);
    dispatch(bookAppointment.setServicesBooking(temp));

    /* add extras */
    let tempExtras = extrasService.filter(ex => ex.checked == true);
    extrasRef.current = extrasService;
    let tempExtrasBooking = [...extrasBooking, ...tempExtras];
    dispatch(bookAppointment.setExtrasBooking(tempExtrasBooking));
  }


  /****************************** GET TIME AVAIABLE BY STAFF  ******************************/
  const [, submitGetStaffAvailable] = useAxiosMutation({
    ...staffGetAvaiableTime(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(bookAppointment.setTimesAvailable(data));
        NavigationService.navigate(screenNames.SelectDateTime, { staffSelected: getStaffSelected() });
      }
    }
  });

  const calculateNextStartTime = () => {
    let nextStartTime = timeBooking ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A");
    for (let i = 0; i < servicesBooking.length; i++) {
      nextStartTime = moment(nextStartTime).add('minutes', servicesBooking[i].duration);
    }
    for (let i = 0; i < extrasBooking.length; i++) {
      nextStartTime = moment(nextStartTime).add('minutes', extrasBooking[i].duration);
    }

    return nextStartTime;
  }

  const findStaffAvaiableOfService = async (staffResponse = []) => {
    const listStaff = [];
    const dayName = moment().format('dddd');
    let timeCompare = timeBooking ? `${dayBooking} ${timeBooking}` : moment().format("MM-DD-YYYY hh:mm A");

    for (let i = 0; i < staffResponse.length; i++) {
      const staff = await staffListByMerchant.find(s => s?.staffId == staffResponse[i].staffId);
      if (staff) {
        const workingTimes = staff?.workingTimes || {};
        for (let [key, value] of Object.entries(workingTimes)) {
          if ((key == dayName) && (value?.isCheck == true)) {
            const nextStartTime = calculateNextStartTime();
            if (
              !moment(timeCompare).isBefore(moment(value?.timeStart, ['hh:mm A'])) &&
              !moment(nextStartTime).isAfter(moment(value?.timeEnd, ['hh:mm A']))
            ) {
              listStaff.push(staffResponse[i]);
            }
          }
        }
      }
    }
    return listStaff;
  }

  /* FETCH STAFF AVAILABLE OF SERVICE */
  const [, fetchStaffAvaiable] = useAxiosQuery({
    ...getStaffOfService(item?.serviceId),
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        const listStaff = await findStaffAvaiableOfService(data);
        await addService();
        await dispatch(bookAppointment.setStafsfOfService(listStaff));
        await NavigationService.navigate(screenNames.SelectStaff, { serviceSelected: item });
      }
    }
  });

  const goToDateTime = async () => {

    let staffSelected = getStaffSelected();

    if ((roleName == "admin" || roleName == "manager") && staffsByDate.length !== 2) {
      if (staffSelectedAppointmentScreen !== 0 && staffSelectedAppointmentScreen !== -1) {
        staffSelected = staffListByMerchant?.find(s => s?.staffId == staffSelectedAppointmentScreen);
      } else if (staffSelectedAppointmentScreen == -1) {
        staffSelected = {
          staffId: -1,
          displayName: "Waiting List"
        }
      } else {
        staffSelected = {
          staffId: 0,
          displayName: "Any staff"
        }
      }
    }

    await addService();
    await dispatch(bookAppointment.setStafsfOfService(data));

    if (isAddMore) {
      dispatch(bookAppointment.updateStatusAddMore(false));
      dispatch(bookAppointment.updateStaffService({ service: item, staff: staffSelected }));
      NavigationService.navigate(screenNames.ReviewConfirm);
      return;
    }

    /**************************** UPDATE STAFF CHO SERVICE *****************************/
    dispatch(bookAppointment.updateStaffService({ service: item, staff: staffSelected }));
    /**************************** QUICK CHECKOUT KHONG CAN CHON DATE TIME *****************************/
    if (isQuickCheckout) {
      NavigationService.navigate(screenNames.ReviewConfirm);
      return;
    }


    /**************************** GET TIME AVAILABLE CHO STAFF DUOC CHON *****************************/
    const data = {
      date: moment(dayBooking).format("YYYY-MM-DD"),
      merchantId: staff?.merchantId,
      appointmentId: 0,
      timezone: new Date().getTimezoneOffset(),
    };


    const body = await staffGetAvaiableTime(staffSelected?.staffId, data);
    submitGetStaffAvailable(body.params);
  };


  return {
    item,
    durationService,
    extrasService,
    isEditItem,
    servicesBooking,
    price,
    isEditPrice,
    setStatusEditPrice,
    setPrice,
    inputPriceRef,

    goToSelectStaff: () => {
      if ((roleName == "admin" || roleName == "manager") && staffsByDate.length !== 2) {
        /**************** BOOK APPOINTMENT ROLE ADMIN & MANAGER  *****************/
        if (servicesBooking.length == 0) {
          if ((isQuickCheckout && staffSelectedAppointmentScreen == 0) || (isQuickCheckout && staffSelectedAppointmentScreen == -1)) {
            fetchStaffAvaiable();
          } else {
            goToDateTime();
          }
        } else {
          if ((!isNaN(servicesBooking[0]?.staffId) && servicesBooking[0]?.staffId == 0) || (!isNaN(servicesBooking[0]?.staffId) && servicesBooking[0]?.staffId == -1)) {
            goToDateTime();
          } else {
            fetchStaffAvaiable();
          }
        }
      } else {
        /**************** BOOK APPOINTMENT ROLE STAFF *****************/
        goToDateTime();
      }
    },

    goToReview: () => {
      editService();
      NavigationService.navigate(screenNames.ReviewConfirm)
    },

    onChangeDurationService: (duration) => {
      setDurationService(duration);
    },

    onChangeExtraService: extra => {
      let temp = [...extrasService];
      const index = temp.findIndex(obj => obj.extraId == extra.extraId);
      if (index !== -1) {
        temp[index] = extra;
      }
      setExtrasService(temp);
    },

    back: () => {
      if (isEditItem) {
        NavigationService.navigate(screenNames.ReviewConfirm);
      } else {
        const findService = servicesBooking.find(obj => obj?.serviceId == item?.serviceId);
        if (findService && !findService.staffId) {
          dispatch(bookAppointment.deleteService(findService))
        }
        NavigationService.back();
      }
    }

  };
};
