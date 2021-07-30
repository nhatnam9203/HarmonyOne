// import { appMerchant } from '@redux/slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query';
import { axios } from '@shared/services/axiosClient';
import actions from '@src/redux/slices';

export const useMerchantLogin = ({ isUseAppLoading = true, merchantID }) => {
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
        if (response.data) {
          dispatch(actions.auth.loginMerchant(response.data));
        }
      },
      onError: (err) => {
        console.log(err);
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
