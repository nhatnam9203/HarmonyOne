import { axios } from '@shared/services/axiosClient';
import * as actions from '@src/redux/slices';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import qs from 'qs';

export const useStaffLogin = ({
  isUseAppLoading = true,
  pinCode,
  merchantID,
  onLoginSuccess,
  onLoginError,
}) => {
  const dispatch = useDispatch();

  const staffRequestLogin = async () => {
    const response = await axios({
      url: 'staff/login',
      method: 'POST',
      data: {
        merchantCode: merchantID,
        staffPin: pinCode,
      },
    });

    return response?.data;
  };

  const {
    mutate: staffLogin,
    isLoading,
    isError,
    data,
  } = useMutation(
    staffRequestLogin,
    {
      onSuccess: (response) => {
        if (response.data) {
          dispatch(actions.auth.loginStaff(response.data));

          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess();
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

  return [{ isLoading, data }, staffLogin];
};
