import React from "react";
import { getStaffOfService, useAxiosQuery } from "@src/apis";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { bookAppointment, editAppointment } from "@redux/slices";
import { formatNumberFromCurrency, 
          formatMoney, 
          convertMinsToHrsMins 
        } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

export const useProps = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const extrasEdit = route?.params?.extrasEdit;

  const inputPriceRef = React.useRef();
  const inputTipRef = React.useRef();

  const { bookAppointment: {
    servicesBooking = [],
  } } = useSelector(state => state);

  const [price, setPrice] = React.useState("");
  const [tip, setTip] = React.useState("");
  const [isEditPrice, setStatusEditPrice] = React.useState(false);
  const [isEditTip, setStatusEditTip] = React.useState(false);
  const [extrasService, setExtrasService] = React.useState([]);

  React.useEffect(() => {
    const extras = extrasEdit.map(ex => ({ ...ex, serviceId: item?.serviceId, isEditPrice: false }));
    setExtrasService(extras)
    setPrice(item?.price);
    setTip(item?.tipAmount);
  }, []);


  const editService = () => {
    const itemServiceEdit = {
      ...item,
      price,
      tipAmount: tip
    }
    // const tempExtras = extrasService;
    dispatch(editAppointment.editService({ service: itemServiceEdit }));
    dispatch(editAppointment.updateExtras(extrasService));
    NavigationService.back();
  }

  const getTotalDuration = () => {
    let total = 0;
    for (const el of extrasService) {
        total += parseInt(el.duration);
    }
    return `${convertMinsToHrsMins(total)}`;
}

const getTotalPrice = () => {
    let total = 0;
    total += formatNumberFromCurrency(price);
    for (const el of extrasService) {
         total += formatNumberFromCurrency(el.price);
    }
    return formatMoney(total);
}


  return {
    item,
    extrasService,
    servicesBooking,
    price,
    tip,
    isEditPrice,
    isEditTip,
    setStatusEditPrice,
    setStatusEditTip,
    setPrice,
    setTip,
    inputPriceRef,
    inputTipRef,
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

    editService,
    getTotalPrice,
    getTotalDuration,
  };
};
