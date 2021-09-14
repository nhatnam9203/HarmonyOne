// import { appMerchant } from '@redux/slices';
import { axios } from '@shared/services/axiosClient';
import { app } from '@src/redux/slices';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

let cancelToken;

export const useAxiosQuery = ({
  params,
  queryId,
  onLoginSuccess,
  onLoginError,
  isLoadingDefault = true,
  enabled = false,
  isCancelToken = false,
}) => {
  const dispatch = useDispatch();

  const requestGet = async () => {
    const response = await axios(params);

    return response?.data;
  };

  const { refetch, status, isError, isFetching, data } = useQuery(
    [queryId, params],
    (body) => requestGet(body),
    {
      enabled,
      retry: false,
      onSuccess: (response) => {
        dispatch(app?.hideLoading());
        if (response.data) {
          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess(response.data, response);
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
        console.log({ err })
        dispatch(app?.hideLoading());
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
    if (!isLoadingDefault) {
      return;
    }
    if (isFetching) {
      // show app loading here
      dispatch(app?.showLoading());
    }

    if (!isFetching) {
      // hide app loading here
      dispatch(app?.hideLoading());
    }
  }, [data, dispatch, isLoadingDefault, isError, isFetching]);

  return [{ isLoading: isFetching, data }, refetch];
};
