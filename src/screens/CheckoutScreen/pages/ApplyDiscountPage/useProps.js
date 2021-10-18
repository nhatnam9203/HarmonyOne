import React from 'react';
import { Alert } from "react-native";
import { useAxiosQuery, getListCustomer, addPromotionNote, customPromotion, useAxiosMutation, getAppointmentById } from '@src/apis';
import { useDispatch, useSelector } from "react-redux";
import { customer, bookAppointment, appointment } from "@redux/slices";
import { useForm, useWatch } from "react-hook-form";
import { formatNumberFromCurrency } from "@shared/utils";
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2).toString();
}

export const useProps = (props) => {
  const dispatch = useDispatch();

  const form = useForm();

  const {
    appointment: { appointmentDetail, groupAppointments, promotionAppointment },
  } = useSelector(state => state);

  const discountTypeRef = React.useRef();

  const [moneyDiscountCustom, setMoneyDiscountCustom] = React.useState(0);
  const [moneyDiscountFixedAmout, setMoneyDiscountFixedAmout] = React.useState(0);
  const [discountByOwner, setDiscountByOwner] = React.useState(100);



  const [, submitCustomPromotion] = useAxiosMutation({
    ...customPromotion(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchAppointmentById();
      }
    }
  });

  const [, submitAddPromotionNote] = useAxiosMutation({
    ...addPromotionNote(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {

      }
    }
  });

  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentDetail?.appointmentId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.CheckoutScreen);
      }
    },
  });

  React.useEffect(() => {
    const note = promotionAppointment?.notes?.note || "";
    const customDiscountFixed = appointmentDetail?.customDiscountFixed
    const customDiscountPercent = appointmentDetail?.customDiscountPercent;

    if (customDiscountFixed && customDiscountFixed > 0) {
      form.setValue("valueDiscount", customDiscountFixed);
      discountTypeRef?.current?.changeDiscountType("money");
    } else
      if (customDiscountPercent && customDiscountPercent > 0) {
        form.setValue("valueDiscount", customDiscountPercent);
        discountTypeRef?.current?.changeDiscountType("percent");
      }

    form.setValue("note", note);
    setDiscountByOwner(parseFloat(promotionAppointment?.discountByOwner));
  }, [promotionAppointment]);

  return {
    discountTypeRef,
    form,
    appointmentDetail,
    discountByOwner,
    moneyDiscountCustom,
    moneyDiscountFixedAmout,


    onChangeTextCustomDiscount: (moneyDiscountByPercent, moneyDiscountFixed) => {
      setMoneyDiscountCustom(moneyDiscountByPercent);
      setMoneyDiscountFixedAmout(moneyDiscountFixed);
    },

    back: () => {
      NavigationService.back();
    },

    handelSliderValue: (value) => {
      setDiscountByOwner(value)
    },

    submitPromotion: async () => {
      const dataCustomDiscount = {
        discountByOwner,
        discountFixtom: moneyDiscountFixedAmout,
        discountPercent: moneyDiscountCustom,
      };
      console.log({ dataCustomDiscount })
      const bodyDiscount = await customPromotion(appointmentDetail?.appointmentId, dataCustomDiscount);
      console.log({ bodyDiscount })
      submitCustomPromotion(bodyDiscount.params);

      const dataPromotionNote = {
        notes: form.getValues("note")
      }
      const bodyPromotionNote = await addPromotionNote(appointmentDetail?.appointmentId, dataPromotionNote);
      console.log({ bodyPromotionNote })
      submitAddPromotionNote(bodyPromotionNote.params);


      // this.props.actions.marketing.customPromotion(customDiscountPercent, customFixedAmount, discountByOwner, appointmentIdUpdatePromotion, true);
      // this.props.actions.marketing.addPromotionNote(appointmentDetail.appointmentId, promotionNotes);
      // const { groupAppointment, appointmentIdUpdatePromotion, discount } = this.props;
      // const customDiscountPercent = this.customDiscountRef.current.state.percent;
      // const customFixedAmount = this.customDiscountRef.current.state.fixedAmount;
      // if (isEmpty(groupAppointment)) {
      //   const subTotal = appointmentDetail?.subTotal || 0;

      //   let totalDiscount = 0;
      //   for (let i = 0; i < discount.length; i++) {
      //     totalDiscount = formatNumberFromCurrency(totalDiscount) + formatNumberFromCurrency(discount[i].discount);
      //   }

      //   totalDiscount = formatNumberFromCurrency(totalDiscount) + formatNumberFromCurrency(customFixedAmount);
      //   const moneyDiscountCustom = (formatNumberFromCurrency(customDiscountPercent) * formatNumberFromCurrency(subTotal) / 100);
      //   totalDiscount = formatNumberFromCurrency(totalDiscount) + formatNumberFromCurrency(moneyDiscountCustom);

      //   if (formatNumberFromCurrency(totalDiscount) > formatNumberFromCurrency(subTotal)) {
      //     Alert.alert(
      //       `Warning`,
      //       `Discount cannot be more than the subtotal.`,
      //       [

      //         { text: 'OK', onPress: () => { } }
      //       ],
      //       { cancelable: false }
      //     );
      //   } else {
      //     const { promotionNotes, discountByOwner } = this.state;
      //     this.props.actions.marketing.customPromotion(customDiscountPercent, customFixedAmount, discountByOwner, appointmentIdUpdatePromotion, true);
      //     this.props.actions.marketing.addPromotionNote(appointmentDetail.appointmentId, promotionNotes);
      //     this.props.actions.marketing.closeModalDiscount();
      //   }
      // }
    }

  }
};