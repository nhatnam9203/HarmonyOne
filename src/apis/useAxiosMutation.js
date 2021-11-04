import { axios } from '@shared/services/axiosClient';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { app } from '@src/redux/slices';

export const useAxiosMutation = ({
  params,
  onSuccess,
  onLoginError,
  isLoadingDefault = true,
  isStopLoading = false,
}) => {
  const dispatch = useDispatch();

  const postRequest = async (body = null) => {
    const response = body ? await axios(body) : await axios(params);
    console.log({ body,params, response })
    return response?.data;
  };

  const { mutate, isLoading, isError, data } = useMutation((body) => postRequest(body),
    {
      onSuccess: (response) => {
        if (response?.codeNumber == 200 || response?.codeNumber == 204) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response?.data, response);
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
        dispatch(app.hideLoading());
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
    if (!isLoadingDefault) {
      return;
    }

    if (isLoading) {
      // show app loading hereF
      dispatch(app.showLoading());
    }

    if (!isLoading && !isStopLoading) {
      // hide app loading here
      dispatch(app.hideLoading());
    }
  }, [data, dispatch, isLoading, isLoadingDefault, isError]);

  return [{ isLoading, data }, mutate];
};
