import React from "react";
import {
  getNotification,
  useAxiosQuery,
  useAxiosMutation,
  readAllNotification,
  getCountUnReadOfNotification,
  getAppointmentById,
  maskNotiAsReadById,
} from "@src/apis";

import { useSelector, useDispatch } from "react-redux";
import { notification, appointment } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const {
    notification: { notifications = [], pages }
  } = useSelector(state => state);


  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isLoadingDefault, setLoadingDefault] = React.useState(true);
  const [appointmentDetailId, setAppointmentDetailId] = React.useState("");


  const [{ isLoading }, fetchNotification] = useAxiosQuery({
    ...getNotification(currentPage),
    queryId : "fetchNotification_notify",
    isLoadingDefault: currentPage == 1,
    enabled: true,
    onSuccess: (data, response) => {
      dispatch(notification.setNotificationList({
        ...response,
        currentPage
      }));
      setRefresh(false);
    },
  });


  const [, fetchCountUnread] = useAxiosQuery({
    ...getCountUnReadOfNotification(),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      dispatch(notification.setCountUnread(data));
    },
  });

  const [, submitReadNotification] = useAxiosMutation({
    ...maskNotiAsReadById(),
  });

  const [, submitReadAllNotification] = useAxiosMutation({
    ...readAllNotification(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        fetchNotification();
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
    fetchCountUnread();
  }, []);


  React.useEffect(() => {
    if (appointmentDetailId) {
      fetchAppointmentById();
    }
  }, [appointmentDetailId]);


  React.useEffect(() => {
    if (isRefresh) {
      fetchNotification();
      fetchCountUnread();
    }
  }, [isRefresh]);

  return {
    notifications,
    isRefresh,
    isLoading,
    currentPage,

    loadMore: () => {
      if (currentPage < pages) {
        let page = currentPage + 1;
        setCurrentPage(page);
      }
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
    },

    clearAll: () => {
      submitReadAllNotification();
    },

    onPressItem: async(item) => {
      if (parseInt(item?.appointmentId) !== 0) {
        if (appointmentDetailId !== item?.appointmentId) {
          setAppointmentDetailId(item?.appointmentId);
        } else {
          fetchAppointmentById();
        }
      }

      if (item?.view == 0) {
        const body = await maskNotiAsReadById(item?.merchantNotificationId);
        submitReadNotification(body.params);
        dispatch(notification.changeNotifyRead(item?.merchantNotificationId));
      }

    }

  };
};
