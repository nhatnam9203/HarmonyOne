import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { useForm, useWatch } from "react-hook-form";
import { getSmsInformation, useAxiosQuery, getCustomerCanbeSendPromotion, createNewCampaign, useAxiosMutation, getPromotionMerchant } from "@src/apis";
import { marketing } from "@redux/slices";
import { isEmpty } from "lodash";
import { getShortNameForDiscountAction, formatMoney, formatNumberFromCurrency } from "@shared/utils";
import moment from "moment";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const merchantPromotionId = props?.route?.params?.merchantPromotionId || 0;

  const [t] = useTranslation();
  const {
    auth: { staff },
    merchant: { merchantDetail },
    marketing: { smsInfoMarketing },
  } = useSelector(state => state);

  const form = useForm({

  });
  const { setValue } = form;
  const errors = form.formState.errors;

  const actionRef = React.useRef();
  const conditionRef = React.useRef();
  const datePickerRef = React.useRef();
  const smsConfigurationRef = React.useRef();
  const alertRef = React.useRef();

  const [checked, setChecked] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [visibleEndDate, setVisibleEndDate] = React.useState(true);
  const [conditionId, setConditionId] = React.useState(1);

  const [dataServiceProduct, setDataServiceProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [numberOfTimesApply, setNumberOfTimesApply] = useState("");
  const [actionTags, setActionTags] = useState([]);
  const [customerSendSMSQuantity, setCustomerSendSMSQuantity] = useState(0);
  const [smsAmount, setSmsAmount] = useState("0.00");
  const [smsMaxAmount, setSmsMaxAmount] = useState("0.00");
  const [messageContent, setMessageContent] = React.useState(null);
  const [smsMaxCustomer, setSMSMaxCustomer] = React.useState(1);
  const [valueSlider, setValueSlider] = React.useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [isManually, setManually] = useState(false);
  const [customerList, setCustomerList] = React.useState([]);


  const [, fetchCustomerCanbeSendPromotion] = useAxiosQuery({
    ...getCustomerCanbeSendPromotion(merchantPromotionId, staff?.merchantId),
    queryId: "fetchCustomerCanbeSendPromotion_newCampaign",
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setSMSMaxCustomer(data.length);
        setCustomerList(data);
      }
    }
  });

  React.useEffect(() => {
    fetchCustomerCanbeSendPromotion();
  }, [merchantPromotionId])



  const condition = useWatch({
    control: form.control,
    name: 'condition'
  });

  const actionCondition = useWatch({
    control: form.control,
    name: 'actionCondition'
  });


  const promotionType = useWatch({
    control: form.control,
    name: 'promotionType'
  });

  const promotionValue = useWatch({
    control: form.control,
    name: 'promotionValue'
  });

  const title = useWatch({
    control: form.control,
    name: 'campaignName'
  });



  const defaultMessage = (conditionServiceProductTags, actionServiceTags) => {
    const actionServices = actionRef?.current?.getServices();
    const actionCategories = actionRef?.current?.getCategories();
    const actionCondition = actionRef?.current?.getConditionValue().value;

    const actionTags = actionServiceTags ? actionServiceTags : parseInt(actionCondition) == 2 ? actionServices :
      parseInt(actionCondition) == 3 ? actionCategories : [];

    const actionMsg =
      actionTags?.length > 0
        ? `off for ${actionTags?.map((x) => x.name || "").join(", ")}.`
        : "";

    const promotionMsg =
      promotionType === "percent"
        ? promotionValue + " %"
        : "$ " + promotionValue;

    const businessName = merchantDetail?.businessName ?? "";

    const conditionValue = conditionRef?.current?.getConditionValue().value;
    const servicesCondition = conditionRef?.current?.getServices();

    const {
      visibleEndDate,
      startDay,
      endDay,
      startTime,
      endTime,
    } = datePickerRef?.current?.getValueDatePicker();

    switch (parseInt(conditionValue)) {
      case 1:
        // convert endDate to string for format
        const mergeEndDate = !visibleEndDate
          ? null
          : `${moment(endDay).format("YYYY-MM-DD")}T${moment(endTime, ["hh:mm A"]).format("hh:mm")}:00`


        // create message content with endDate
        const endDateMsg = mergeEndDate
          ? `This offer is ends on ${moment(mergeEndDate).format("DD MMMM YYYY hh:mm A")} so hurry`
          : "Hurry";

        // ====> return text message
        return `Look out! 👀 ${businessName} is waiting for you to claim their special ${title} promotion to get ${promotionMsg} ${actionMsg}. ${endDateMsg} 🏃🏻‍♀️ and book your appointment on HarmonyPay App now!`;
      case 2:
        const arrMessage = conditionServiceProductTags ? conditionServiceProductTags : servicesCondition;
        const serviceMsg =
          arrMessage?.map((x) => x.name || "").join(", ") ||
          "";
        // ====> return text message
        return `More for less and all for you! During their ${title} promotion,choose any of ${serviceMsg} at ${businessName} to get ${promotionMsg}${actionMsg}. Hurry and book your appointment on HarmonyPay App now to grab this deal!`;
      case 3:
        // ====> return text message
        return `Happy, happy birthday! Hurry onto your HarmonyPay App to claim a special gift from one of your favorite stores, ${businessName} to get ${promotionMsg}${actionMsg}.`;
      case 4:
        // ====> return text message
        return `Loyalty pays! Literally. Go onto your HarmonyPay App to grab this special gift from  ${businessName} to get ${promotionMsg}${actionMsg}. Thanks for being one of our best customers!`;
      case 5:
        // ====> return text message
        return (
          `Aww, shucks! We think you're awesome too! Here's a sweet thank you gift from you from ${businessName} for your referral. Hurry to the HarmonyPay App to claim your exclusive deal!` +
          `Hurry to your HarmonyPay App to claim your referral reward from ${businessName} to get ${promotionMsg}${actionMsg}`
        );
      default:
        return "No message content";
    }
  }

  const calculatorsmsMoney = (tempValue) => {
    const customerCount = parseInt(smsMaxCustomer || 0);
    const smsCount = Math.ceil(tempValue * customerCount);

    const messageContent = form.getValues("message");
    // const smsLength = smsInfoMarketing?.smsLength || 1;
    const smsLength = messageContent?.trim().length || 1;
    const segmentFee = smsInfoMarketing?.segmentFee || 1;
    const segmentLength = smsInfoMarketing?.segmentLength || 1;
    // const additionalFee = parseFloat(smsCount > 0 ? (smsInfoMarketing?.additionalFee || 0) : 0);
    const additionalFee = parseFloat(smsInfoMarketing?.additionalFee || 0);

    const actionCondition = actionRef?.current?.getConditionValue();
    const servicesCondition = conditionRef?.current?.getServices();

    const allSMSWord =
      smsLength +
      (title?.length || 0) +
      (actionCondition.value === 2
        ? `${servicesCondition.join(", ")}`.length + 35
        : 0) +
      (getShortNameForDiscountAction(actionCondition) === "specific"
        ? `${actionTags.join(", ")}`.length + 35
        : 0);

    const tempFee =
      Math.ceil(
        parseFloat(Math.ceil(allSMSWord / segmentLength) * segmentFee) * 100
      ) /
      100 +
      additionalFee;

    const smsMoney = parseFloat(smsCount * tempFee);

    const smsMaxMoney =
      customerCount == 0 ? 0 : parseFloat(customerCount * tempFee);

    setSmsAmount(formatMoney(smsMoney));
    setSmsMaxAmount(formatMoney(smsMaxMoney));
    setCustomerSendSMSQuantity(smsCount);
  };

  const hanldeSliderValue = (val = 0) => {
    setValueSlider(val);
    calculatorsmsMoney(val);

    // const customerCount = parseInt(smsMaxCustomer || 0);
    // const smsCount = Math.ceil(val * customerCount);

    // setCustomerList(
    //   customerList.map((x, index) =>
    //     Object.assign({}, x, {
    //       checked: index < smsCount ? true : false,
    //     })
    //   )
    // );
  };


  React.useEffect(() => {
    if (!isEmpty(smsInfoMarketing)) {
      const customerCount = Math.max(
        smsInfoMarketing?.customerCount,
        smsMaxCustomer
      );
      // const customerSendSMSQty =
      //   promotionDetailById?.customerSendSMSQuantity || 0;

      const customerSendSMSQty = 0;

      let tempValue = 0;
      if (customerCount > 0) {
        tempValue = customerSendSMSQty / customerCount;
      }

      setValueSlider(tempValue);
      setSMSMaxCustomer(customerCount);
      // calculatorsmsMoney(tempValue);
    }
  }, [smsInfoMarketing]);

  // React.useEffect(() => {
  //   if (isEmpty(smsInfoMarketing)) {
  //     calculatorsmsMoney(value);
  //   }
  // }, [title, actionServices, actionCategories, actionCondition]);




  React.useEffect(() => {
    if (condition) {
      setConditionId(condition.value);
      const message = defaultMessage();
      form.setValue("message", message);
    }
  }, [condition]);

  React.useEffect(() => {
    form.setValue("message", defaultMessage());
  }, [promotionType]);


  const [,] = useAxiosQuery({
    ...getSmsInformation(conditionId),
    queryId: "fetchPromotionDetailById",
    enabled: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(marketing.setSmsInfoMarketing(data));
      }
    }
  })

  const [, submitCreateNewCampaign] = useAxiosMutation({
    ...createNewCampaign(),
    onSuccess: (data, response) => {
      fetchPromotion();
      alertRef?.current?.alertWithType('info', 'New Promotion', response?.message);
    }
  });

  const [, fetchPromotion] = useAxiosQuery({
    ...getPromotionMerchant(),
    queryId: "reFetchCampaign",
    enabled: false,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(marketing.setPromotion(data));
        NavigationService.back();
      }
    },
  });


  return {
    form,
    errors,

    actionRef,
    conditionRef,
    datePickerRef,
    smsConfigurationRef,
    alertRef,
    checked,
    visibleEndDate,
    defaultMessage,
    smsMaxCustomer,
    smsMaxAmount,
    valueSlider,
    setChecked,
    smsAmount,
    customerSendSMSQuantity,
    isManually,
    isDisabled,
    setDisabled,
    setManually,
    calculatorsmsMoney,

    getActionSheets: (category) => [
      {
        id: 'edit-campaign',
        label: t('Edit campaign'),
        func: () => { },
      },
      {
        id: 'delete-campaign',
        label: t('Delete'),
        textColor: colors.red,
        func: () => { alert('chưa có api delete campaign') }
      },
    ],

    onUploadImage: () => {

    },

    onChangeEndDate: isVisible => {
      setVisibleEndDate(isVisible);
    },

    hanldeSliderValue,

    handleCampaign: async () => {

      const conditionValue = conditionRef?.current?.getConditionValue().value;
      const servicesCondition = conditionRef?.current?.getServices();
      const actionCondition = actionRef?.current?.getConditionValue();
      const actionServices = actionRef?.current?.getServices();
      const actionCategories = actionRef?.current?.getCategories();

      const {
        visibleEndDate,
        startDay,
        endDay,
        startTime,
        endTime,
      } = datePickerRef?.current?.getValueDatePicker();

      // const tempConditionTags = getFormatTags(conditionServiceProductTags);
      // const tempActionTags = getFormatTags(actionTags);
      const campaign = {
        name: title,
        fromDate: `${moment(startDay).format("YYYY-MM-DD")}T${moment(startTime, ["hh:m A"]).format("HH:mm")}:00`,
        toDate: `${moment(endDay).format("YYYY-MM-DD")}T${moment(endTime, ["hh:m A"]).format("HH:mm")}:00`,
        conditionId: conditionValue,
        applyTo: getShortNameForDiscountAction(actionCondition),
        conditionDetail:
          conditionValue === 4
            ? numberOfTimesApply
            : {
              service: servicesCondition?.map(sv => (sv.serviceId)) || [],
              product: [],
            },
        applyToDetail: {
          service: actionServices?.map(sv => (sv.serviceId)),
          product: [],
          category: actionCategories?.map(ct => (ct.categoryId)),
        },
        promotionType: promotionType,
        promotionValue: `${promotionValue || "0.00"}`,
        isDisabled: isDisabled ? 1 : 0,
        smsAmount: smsAmount,
        customerSendSMSQuantity: customerSendSMSQuantity ?? 0,
        fileId: 0,
        smsType: smsConfigurationRef?.current?.getSmsType(),
        content: form.getValues("message"),
        noEndDate: visibleEndDate,
        isManually: isManually,
        customerIds: customerList
          .map((x) => x.customerId),
      };

      console.log({ campaign });

      const body = await createNewCampaign(campaign);
      submitCreateNewCampaign(body.params);

      // ------------ Check Valid ---------
      // let isValid = true;
      // const fromDate = new Date(campaign?.fromDate).getTime();
      // const toDate = new Date(campaign?.toDate).getTime();

      // if (!campaign?.name) {
      //   alert("Enter the campaign's name please!");
      //   isValid = false;
      // } else if (parseInt(fromDate) >= parseInt(toDate) && !noEndDate) {
      //   alert("The start date is not larger than the end date ");
      //   isValid = false;
      // } else if (
      //   campaign.conditionId === 2 &&
      //   conditionServiceProductTags.length < 1
      // ) {
      //   alert("Select services/product specific please!");
      //   isValid = false;
      // } else if (
      //   campaign.conditionId === 4 &&
      //   parseInt(numberOfTimesApply ? numberOfTimesApply : 0) < 1
      // ) {
      //   alert("Enter the number of times applied please!");
      //   isValid = false;
      // } else if (campaign?.applyTo === "specific" && actionTags.length < 1) {
      //   alert("Select services/product for discount specific please!");
      //   isValid = false;
      // } else if (promotionValue == 0) {
      //   alert("Enter promotion value please!");
      //   isValid = false;
      // }

      // if (isValid) {
      //   isHandleEdit
      //     ? updatePromotionById(promotionId, campaign)
      //     : handleCreateNewCampaign(campaign);
      // }
    }
  };
};
