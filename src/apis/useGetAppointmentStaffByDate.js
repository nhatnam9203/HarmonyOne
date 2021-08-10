// import { appMerchant } from '@redux/slices';
import { axios } from '@shared/services/axiosClient';
import * as actions from '@src/redux/slices';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

export const useGetAppointmentStaffByDate = ({
  isUseAppLoading = false,
  staffId,
  date,
  onLoginSuccess,
  onLoginError,
}) => {
  const dispatch = useDispatch();

  const getAppointmentStaffByDate = async () => {
    const response = await axios({
      url: `/appointment/staffByDate/${staffId}?date=${date}`,
      method: 'GET',
    });

    return response?.data;
  };

  const {
    refetch: appointmentStaffByDate,
    isLoading,
    isError,
    data,
  } = useQuery(
    'appointment_staff_by_date',
    getAppointmentStaffByDate,
    {
      enabled: false,
      retry: false,
      onSuccess: (response) => {
        console.log(response);

        if (response.data) {
          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess(response.data);
          }
        } else {
          if (
            response?.message &&
            onLoginError &&
            typeof onLoginError === 'function'
          ) {
            onLoginError(response?.message);
          }
        }
      },
      onError: (err) => {
        console.log(err);
        if (
          err?.message &&
          onLoginError &&
          typeof onLoginError === 'function'
        ) {
          onLoginError(err?.message);
        }
      },
    }, // disable fetch auto
  );

  React.useEffect(() => {
    if (!isUseAppLoading) {
      return;
    }

    if (isLoading) {
      // show app loading hereF
      //   dispatch(appMerchant.showLoading());
    }

    if (!isLoading && (data || isError)) {
      // hide app loading here
      //   dispatch(appMerchant.hideLoading());
    }
  }, [data, dispatch, isLoading, isUseAppLoading, isError]);

  return [{ isLoading, data }, appointmentStaffByDate];
};
