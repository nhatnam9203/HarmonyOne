
import NavigationService from '@navigation/NavigationService';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from "react";
import { useAxiosMutationReport, staffLoginRequest } from "@src/apis";
import { saveAuthTokenReport } from '@shared/storages/authToken';
import { Alert } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

export const useProps = (_params) => {
  const merchantID = useSelector((state) => state.merchant?.merchantDetail?.merchantCode);
  const pincodeSaved = useSelector((state) => state.dataLocal.pincodeSaved);

  const [{ isLoading }, staffLogin] = useAxiosMutationReport({
    ...staffLoginRequest(merchantID, pincodeSaved),
    onLoginError: (msg) => {
      NavigationService.back();
    },
    isLoadingDefault : false,
    onSuccess: (data) => {
      if (data) {
        saveAuthTokenReport(data?.token);
      }
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      staffLogin();
    }, [])
  )
  return {

  };
};
