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
  onSuccess,
  onError,
  isLoadingDefault = true,
  isStopLoading = false,
  enabled = false,
  isCancelToken = false,
}) => {
  const dispatch = useDispatch();

  const requestGet = async () => {
    const response = await axios(params);
    return response?.data;
  };

  const { refetch, status, isError, isFetching, data, } = useQuery(
    [queryId, params],
    () => requestGet(),
    {
      enabled,
      retry: false,
      onSuccess: (response) => {
        if(!isStopLoading){
          dispatch(app?.hideLoading());
        }
        if (response?.codeNumber == 200 || response?.codeNumber == 404 || response?.codeNumber == 201) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response?.data, response);
          }
        } else {
          if (
            response?.message
          ) {
            dispatch(app.hideLoading());
            dispatch(
              app.setError({
                isError: true,
                messageError: response?.message,
                errorType: "error",
                titleError: "Alert",
              }));
            if (onError && typeof onError == "function") {
              onError(response?.message);
            }
          }
        }
      },
      onError: (err) => {
        if (
          err?.message &&
          onError &&
          typeof onError === 'function'
        ) {
          onError(err?.message);
        }
      },
    }, // disable fetch auto
  );

  React.useEffect(() => {
    if (isLoadingDefault) {
      if (isFetching) {
        // show app loading here
        dispatch(app?.showLoading());
      }

      if (!isFetching && !isStopLoading) {
        // hide app loading here
        dispatch(app?.hideLoading());
      }
    }
  }, [data, dispatch, isLoadingDefault, isError, isFetching]);

  return [{ isLoading: isFetching, data }, refetch];
};
