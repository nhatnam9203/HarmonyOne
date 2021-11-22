import React from "react";
import { getStaffOfService, useAxiosQuery, staffGetAvaiableTime , useAxiosMutation} from "@src/apis";
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
    },
    auth: { staff },
    staff: { staffListByMerchant = [] },
  } = useSelector(state => state);

  const [durationService, setDurationService] = React.useState(0);
  const [extrasService, setExtrasService] = React.useState([]);

  const [price, setPrice] = React.useState("");
  const [isEditPrice, setStatusEditPrice] = React.useState(false);


  const getStaffSelected = () => {
    return staffListByMerchant?.find(s => s?.staffId == staff?.staffId);
  }


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
        console.log("----- on back ----")
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

  /* FETCH STAFF AVAILABLE OF SERVICE */
  const [, fetchStaffAvaiable] = useAxiosQuery({
    ...getStaffOfService(item?.serviceId),
    enabled: false,
    onSuccess: async (data, response) => {
      if (response?.codeNumber == 200) {
        await addService();
        await dispatch(bookAppointment.setStafsfOfService(data));
        await NavigationService.navigate(screenNames.SelectStaff, { serviceSelected: item });
      }
    }
  });

  const goToDateTime = async () => {

    const staffSelected = getStaffSelected();

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
    console.log({ data, staffSelected })
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
      const roleName = staff?.roleName?.toString()?.toLowerCase();
      if (roleName == "admin" || roleName == "manager") {
        fetchStaffAvaiable();
      } else {
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
