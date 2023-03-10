import { axios } from '@shared/services/axiosClientReport';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { app } from '@src/redux/slices';

export const useAxiosMutationReport = ({
  params,
  onSuccess,
  onError,
  isLoadingDefault = true,
  isStopLoading = false,
  isReturnError = true
}) => {
  const dispatch = useDispatch();

  const postRequest = async (body = null) => {
    const response = body ? await axios(body) : await axios(params);
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
            response?.message
          ) {
            dispatch(app.hideLoading());
            if(isReturnError){
              dispatch(
                app.setError({
                  isError: true,
                  messageError: response?.message,
                  errorType: "error",
                  titleError: "Alert",
                }));
            }
            if(onError && typeof onError == "function"){
              onError(response?.message);
            }
          }
        }
      },
      onError: (err) => {
        dispatch(app.hideLoading());
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
