import React from "react";
import {
  getNotification,
  useAxiosQuery,
  useAxiosMutation,
  readAllNotification,
  getCountUnReadOfNotification,
  getAppointmentById,
  maskNotiAsReadById,

  getNotifyRoleStaff,
  disableNotifyRoleStaff,
  deleteNotifyRoleStaff,
} from "@src/apis";

import { useSelector, useDispatch } from "react-redux";
import { notification, appointment } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const {
    notification: {
      notifications_roleStaff = [],
      pages_roleStaff
    },
    auth: { staff }
  } = useSelector(state => state);


  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isLoadingDefault, setLoadingDefault] = React.useState(true);
  const [appointmentDetailId, setAppointmentDetailId] = React.useState("");

  const dialogConfirmRef = React.useRef();


  const [{ isLoading }, fetchNotificationRoleStaff] = useAxiosQuery({
    ...getNotifyRoleStaff(staff?.staffId, currentPage),
    queryId: "fetchNotificationRoleStaff_notify",
    isLoadingDefault: currentPage == 1,
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(notification.setNotificationList_roleStaff({
        ...response,
        currentPage
      }));
      setRefresh(false);
    },
  });

  const [, fetchCountUnread] = useAxiosQuery({
    ...getNotifyRoleStaff(staff?.staffId, 1),
    queryId: "fetchCountUnreadRoleStaff_notify",
    isLoadingDefault: false,
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(notification.setCountUnread_roleStaff({
        ...response,
        currentPage
      }));
    },
  });

  const [, sumitDeleteNotifyRoleStaff] = useAxiosMutation({
    ...deleteNotifyRoleStaff(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        if(currentPage == 1){
          fetchNotificationRoleStaff();
        }else{
          setCurrentPage(1);
        }
      }
    }
  });


  const [, submitdDisableNotifyRoleStaff] = useAxiosMutation({
    ...disableNotifyRoleStaff(),
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchCountUnread();
      }
    }
  });


  const [, fetchAppointmentById] = useAxiosQuery({
    ...getAppointmentById(appointmentDetailId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(appointment.setAppointmentDetail(data));
        NavigationService.navigate(screenNames.AppointmentDetailScreen);
      }
    },
  });


  React.useEffect(() => {
    if (appointmentDetailId) {
      fetchAppointmentById();
    }
  }, [appointmentDetailId]);


  React.useEffect(() => {
    if (isRefresh) {
      fetchNotificationRoleStaff();
    }
  }, [isRefresh]);

  return {
    notifications_roleStaff,
    pages_roleStaff,
    isRefresh,
    isLoading,
    currentPage,
    dialogConfirmRef,

    loadMore: () => {
      if (currentPage < pages_roleStaff) {
        let page = currentPage + 1;
        setCurrentPage(page);
      }
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
    },

    onConfirmClearNotify: async () => {
      let notify = [];
      for (let i = 0; i < 20; i++) {
        if (notifications_roleStaff[i]) {
          notify.push(notifications_roleStaff[i].staffNotificationId);
        }
      }
      notify = notify.toString();

      const body = await deleteNotifyRoleStaff(notify);
      sumitDeleteNotifyRoleStaff(body.params);
    },

    clearAll: () => {
      // submitReadAllNotification();
      dialogConfirmRef?.current?.show();
    },

    onPressItem: async (item) => {
      if (parseInt(item?.appointmentId) !== 0) {
        if (appointmentDetailId !== item?.appointmentId) {
          setAppointmentDetailId(item?.appointmentId);
        } else {
          fetchAppointmentById();
        }
      }

      if (item?.isDeleted == 0) {
        const body = await disableNotifyRoleStaff(item?.staffNotificationId);
        submitdDisableNotifyRoleStaff(body.params);
        dispatch(notification.changeNotifyRoleStaffRead(item?.staffNotificationId));
      }

    }

  };
};
