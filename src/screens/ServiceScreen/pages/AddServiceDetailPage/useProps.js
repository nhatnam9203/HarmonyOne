import React from "react";
import { getStaffOfService, useAxiosQuery } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { bookAppointment, editAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';


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


  const { bookAppointment: {
    servicesBooking = [],
    extrasBooking = [],
  } } = useSelector(state => state);

  const [durationService, setDurationService] = React.useState(0);
  const [extrasService, setExtrasService] = React.useState([]);

  const [price, setPrice] = React.useState("");
  const [isEditPrice, setStatusEditPrice] = React.useState(false);


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

  }, []);


  const editService = () => {
    const itemServiceEdit = {
      ...item,
      duration: durationService,
      price,
    }
    const tempExtras = extrasService;
    dispatch(editAppointment.editService({ service: itemServiceEdit, extras: tempExtras }));
    dispatch(editAppointment.updateExtras(tempExtras));
    NavigationService.navigate(screenNames.EditAppointmentScreen);
    // dispatch(bookAppointment.updateExtrasBooking(extrasService));
  }


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
      NavigationService.back();
    },

    addService: () => {
      if (isEditItem) {
        editService();
      } else {
        const service = {
          ...item,
          duration: durationService,
          price
        };
        const tempExtras = extrasService.filter(ex => ex.checked == true);
        dispatch(editAppointment?.addService({ service, extras: tempExtras }));
        NavigationService.navigate(screenNames.EditAppointmentScreen);
      }
    },
  };
};
