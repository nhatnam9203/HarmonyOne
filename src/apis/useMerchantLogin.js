// import { appMerchant } from '@redux/slices';
import { axios } from '@shared/services/axiosClient';
import * as actions from '@src/redux/slices';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

export const useMerchantLogin = ({
  isUseAppLoading = true,
  merchantID,
  onLoginSuccess,
  onLoginError,
}) => {
  const dispatch = useDispatch();

  const merchantRequestLogin = async () => {
    const response = await axios({
      url: `merchant/login/${merchantID}`,
      method: 'POST',
    });

    return response?.data;
  };

  const {
    mutate: merchantLogin,
    isLoading,
    isError,
    data,
  } = useMutation(
    merchantRequestLogin,
    {
      onSuccess: (response) => {
        console.log(response);

        if (response.data?.code) {
          dispatch(actions.auth.loginMerchant(response.data?.code));

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

  return [{ isLoading, data }, merchantLogin];
};
