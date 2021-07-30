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
        console.log('response');
        console.log(response);
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
      //   dispatch(appMerchant.showLoading());F
    }

    if (!isLoading && (data || isError)) {
      // hide app loading here
      //   dispatch(appMerchant.hideLoading());
    }
  }, [data, dispatch, isLoading, isUseAppLoading, isError]);

  return [{ isLoading, data }, merchantLogin];
};
