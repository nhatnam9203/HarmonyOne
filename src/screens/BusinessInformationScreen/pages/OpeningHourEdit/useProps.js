import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { merchantSetting, useAxiosMutation, getMerchantById, useAxiosQuery, getAppointmentByDate , getStaffByDate} from "@src/apis";
import { merchant, appointment , staff as staffAction} from "@redux/slices";
import { dateToFormat } from "@shared/utils";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const {
    merchant: { merchantDetail = {} },
    auth: { staff },
    appointment: { appointmentDate }
  } = useSelector(state => state);

  const workingTimeRef = React.useRef();

  React.useEffect(() => {
    workingTimeRef?.current?.setValue(merchantDetail?.businessHour);
}, [])

  const [, submitMerchantSetting] = useAxiosMutation({
    ...merchantSetting(),
    queryId: "submitMerchantSetting",
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchMerchantById();
        fetchAppointmentByDate();
        fetchStaffByDate();
      }
    }
  });

  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staff?.merchantId),
    queryId: "fetchMerchantById_OpeningHourEdit",
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(merchant.setMerchantDetail(data));
        NavigationService.back();
      }
    },
  });

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "fetchAppointmentByDate_OpeningHourEdit",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });


  const [,fetchStaffByDate] = useAxiosQuery({
    ...getStaffByDate(staff?.merchantId, dateToFormat(appointmentDate, "YYYY-MM-DD")),
    queryId: "fetchStaffByDate_OpeningHourEdit",
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(staffAction.setStaffByDate(data));
    },
  });


  return {
    merchantDetail,
    workingTimeRef,

    onSave: async () => {
      const workingTime = workingTimeRef?.current?.getValue();
      const data = {
        businessHour: workingTime,
        webLink: merchantDetail?.webLink,
        latitude: merchantDetail?.latitude,
        longitude: merchantDetail?.longitude,
        taxService: merchantDetail.taxService,
        taxProduct: merchantDetail.taxProduct,
        timezone: merchantDetail?.timezone,
        autoLockscreen: merchantDetail?.autoLockscreen,
        autoCloseAt: merchantDetail?.autoCloseAt,
        autoClose: merchantDetail?.autoClose,
        turnAmount: merchantDetail?.turnAmount,
        staffColumn: merchantDetail?.staffColumn,
        signinAppStyle: merchantDetail?.signinAppStyle,
        sendReviewLinkOption: merchantDetail?.sendReviewLinkOption,
        giftForNewEnabled: merchantDetail?.giftForNewEnabled,
        receiptFooter: merchantDetail?.giftForNewEnabled,
        zip : merchantDetail?.zip,
        address : merchantDetail?.address,
        city : merchantDetail?.city,
        stateId : merchantDetail?.stateId,
        businessName: merchantDetail?.businessName,
        webLink: merchantDetail?.webLink,
        email: merchantDetail?.email,
        cellPhone : merchantDetail?.cellPhone
      }

      const body = await merchantSetting(data);
      submitMerchantSetting(body.params);
    }
  };
};
