import React from "react";
import { auth, app } from "@redux/slices";
import { useDispatch } from "react-redux";
import { staffLogoutRequest, useAxiosMutation } from "@src/apis";
import { clearAuthToken } from "@shared/storages/authToken";
import DeviceInfo from "react-native-device-info";
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const refDialogSignout = React.useRef();


  const [, logout] = useAxiosMutation({
    ...staffLogoutRequest(),
    queryId: "request_logout",
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        setTimeout(() => {
          NavigationService.replace('AuthStack', { isLogout: true });
          dispatch(auth.signOutApp());
          dispatch(app.setStatusHomeScreen(false));
          clearAuthToken();
        }, 200);
      }
    },
  });


  return {
    refDialogSignout,

    onLogout: async() => {
      const data = {
        deviceId: DeviceInfo.getDeviceId(),
        firebaseToken: "",
      }
      const body = await staffLogoutRequest(data);
      logout(body.params);
    },
  };
};
