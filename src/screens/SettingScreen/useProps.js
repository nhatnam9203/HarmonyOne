import React from "react";
import { auth, app } from "@redux/slices";
import { staffLogoutRequest, useAxiosMutation } from "@src/apis";
import { clearAuthToken } from "@shared/storages/authToken";
import { getFcmToken } from "@shared/storages/fcmToken";
import { useSelector, useDispatch } from "react-redux";
import { dataLocal } from "@redux/slices";
import DeviceInfo from "react-native-device-info";
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const refDialogSignout = React.useRef();

  const {
    dataLocal: { isQuickLogin = false }
  } = useSelector(state => state);


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


  const toggleQuickLogin = () => {
    dispatch(dataLocal.setQuickLogin(!isQuickLogin))
  }


  return {
    refDialogSignout,
    toggleQuickLogin,
    isQuickLogin,

    onLogout: async () => {
      const firebaseToken = await getFcmToken();
      const data = {
        deviceId: DeviceInfo.getDeviceId(),
        firebaseToken,
      }
      const body = await staffLogoutRequest(data);
      logout(body.params);
    },
  };
};
