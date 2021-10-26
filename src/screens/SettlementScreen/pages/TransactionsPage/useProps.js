import React from "react";
import { auth } from "@redux/slices";
import { useDispatch } from "react-redux";
import { staffLogoutRequest, useAxiosMutation } from "@src/apis";
import { clearAuthToken } from "@shared/storages/authToken"
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const refDialogSignout = React.useRef();

  const [, logout] = useAxiosMutation({
    ...staffLogoutRequest(),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        NavigationService.navigate('AuthStack', { isLogout: true });
        dispatch(auth.signOutApp());
        clearAuthToken();
      }
    },
  });

  return {
    refDialogSignout,

    onLogout: async () => {
      const body = await staffLogoutRequest();
      logout(body.params);
      NavigationService.navigate('AuthStack', { isLogout: true });
    },
  };
};
