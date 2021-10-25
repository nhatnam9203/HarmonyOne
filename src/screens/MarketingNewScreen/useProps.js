import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { useForm, useWatch } from "react-hook-form";
import { getSmsInformation, useAxiosQuery } from "@src/apis";
import { marketing } from "@redux/slices";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const [t] = useTranslation();
  const { auth: { staff } } = useSelector(state => state);

  const form = useForm({

  });
  const { setValue } = form;
  const errors = form.formState.errors;

  const actionRef = React.useRef();

  const [checked, setChecked] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [visibleEndDate, setVisibleEndDate] = React.useState(true);
  const [conditionId, setConditionId] = React.useState(2);

  const [dataServiceProduct, setDataServiceProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [numberOfTimesApply, setNumberOfTimesApply] = useState("");
  const [actionTags, setActionTags] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [customerSendSMSQuantity, setCustomerSendSMSQuantity] = useState(0);
  const [smsAmount, setSmsAmount] = useState("0.00");
  const [smsMaxAmount, setSmsMaxAmount] = useState("0.00");
  const [messageContent, setMessageContent] = React.useState(null);


  const condition = useWatch({
    control: form.control,
    name: 'condition'
  });

  const promotionType = useWatch({
    control: form.control,
    name: 'promotionType'
  });

  const promotionValue = useWatch({
    control: form.control,
    name: 'promotionValue'
  });

  React.useEffect(() => {
    if (condition) {
      setConditionId(condition.value);
    }
  }, [condition]);

  // const defaultMessage = () => {
  //   const actionMsg = "",

  //   const promotionMsg =
  //     promotionType === "percent"
  //       ? promotionValue + " %"
  //       : "$ " + promotionValue;

  //   const businessName = staff?.businessName ?? "";

  //   switch (getConditionIdByTitle(condition)) {
  //     case 1:
  //       // convert endDate to string for format
  //       const mergeEndDate = noEndDate
  //         ? null
  //         : `${formatWithMoment(
  //           new Date(endDate),
  //           "YYYY-MM-DD"
  //         )}T${formatHourMinute(
  //           formatWithMoment(endTime, HOURS_FORMAT)
  //         )}:00`;

  //       // create message content with endDate
  //       const endDateMsg = mergeEndDate
  //         ? `This offer is ends on ${dateToString(
  //           mergeEndDate,
  //           MESSAGE_END_DATE_FORMAT
  //         )} so hurry`
  //         : "Hurry";

  //       // ====> return text message
  //       return `Look out! 👀 ${businessName} is waiting for you to claim their special ${title} promotion to get ${promotionMsg} ${actionMsg}. ${endDateMsg} 🏃🏻‍♀️ and book your appointment on HarmonyPay App now!`;
  //     case 2:
  //       const serviceMsg =
  //         conditionServiceProductTags?.map((x) => x.value || "").join(", ") ||
  //         "";
  //       // ====> return text message
  //       return `More for less and all for you! During their ${title} promotion,choose any of ${serviceMsg} at ${businessName} to get ${promotionMsg}${actionMsg}. Hurry and book your appointment on HarmonyPay App now to grab this deal!`;
  //     case 3:
  //       // ====> return text message
  //       return `Happy, happy birthday! Hurry onto your HarmonyPay App to claim a special gift from one of your favorite stores, ${businessName} to get ${promotionMsg}${actionMsg}.`;
  //     case 4:
  //       // ====> return text message
  //       return `Loyalty pays! Literally. Go onto your HarmonyPay App to grab this special gift from  ${businessName} to get ${promotionMsg}${actionMsg}. Thanks for being one of our best customers!`;
  //     case 5:
  //       // ====> return text message
  //       return (
  //         `Aww, shucks! We think you're awesome too! Here's a sweet thank you gift from you from ${businessName} for your referral. Hurry to the HarmonyPay App to claim your exclusive deal!` +
  //         `Hurry to your HarmonyPay App to claim your referral reward from ${businessName} to get ${promotionMsg}${actionMsg}`
  //       );
  //     default:
  //       return "No message content";
  //   }
  // }

  // const getDefaultMessageContent = React.useCallback(() => {
  //   const actionMsg =
  //     actionTags?.length > 0
  //       ? `off for ${actionTags?.map((x) => x.value || "").join(", ")}.`
  //       : "";

  //   const promotionMsg =
  //     promotionType === "percent"
  //       ? promotionValue + " %"
  //       : "$ " + promotionValue;

  //   const businessName = merchant?.businessName ?? "";

  //   switch (getConditionIdByTitle(condition)) {
  //     case 1:
  //       // convert endDate to string for format
  //       const mergeEndDate = noEndDate
  //         ? null
  //         : `${formatWithMoment(
  //           new Date(endDate),
  //           "YYYY-MM-DD"
  //         )}T${formatHourMinute(
  //           formatWithMoment(endTime, HOURS_FORMAT)
  //         )}:00`;

  //       // create message content with endDate
  //       const endDateMsg = mergeEndDate
  //         ? `This offer is ends on ${dateToString(
  //           mergeEndDate,
  //           MESSAGE_END_DATE_FORMAT
  //         )} so hurry`
  //         : "Hurry";

  //       // ====> return text message
  //       return `Look out! 👀 ${businessName} is waiting for you to claim their special ${title} promotion to get ${promotionMsg} ${actionMsg}. ${endDateMsg} 🏃🏻‍♀️ and book your appointment on HarmonyPay App now!`;
  //     case 2:
  //       const serviceMsg =
  //         conditionServiceProductTags?.map((x) => x.value || "").join(", ") ||
  //         "";
  //       // ====> return text message
  //       return `More for less and all for you! During their ${title} promotion,choose any of ${serviceMsg} at ${businessName} to get ${promotionMsg}${actionMsg}. Hurry and book your appointment on HarmonyPay App now to grab this deal!`;
  //     case 3:
  //       // ====> return text message
  //       return `Happy, happy birthday! Hurry onto your HarmonyPay App to claim a special gift from one of your favorite stores, ${businessName} to get ${promotionMsg}${actionMsg}.`;
  //     case 4:
  //       // ====> return text message
  //       return `Loyalty pays! Literally. Go onto your HarmonyPay App to grab this special gift from  ${businessName} to get ${promotionMsg}${actionMsg}. Thanks for being one of our best customers!`;
  //     case 5:
  //       // ====> return text message
  //       return (
  //         `Aww, shucks! We think you're awesome too! Here's a sweet thank you gift from you from ${businessName} for your referral. Hurry to the HarmonyPay App to claim your exclusive deal!` +
  //         `Hurry to your HarmonyPay App to claim your referral reward from ${businessName} to get ${promotionMsg}${actionMsg}`
  //       );
  //     default:
  //       return "No message content";
  //   }
  // }, [

  // ]);


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

  return {
    form,
    errors,

    actionRef,
    checked,
    visibleEndDate,

    setChecked,
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
    }
  };
};
