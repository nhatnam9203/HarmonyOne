import React from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useFirebaseNotification from "./useFirebaseNotification";
import NotifService from "@utils/NotifService";
import NavigationService from "@navigation/NavigationService";
import { getAuthToken } from '@shared/storages/authToken';
import { saveFcmToken } from '@shared/storages/fcmToken';
import { activeFirebase, useAxiosMutation } from "@src/apis";
import DeviceInfo from "react-native-device-info";
import _ from 'lodash';
// import {
//   handleAutoClose,
// } from "@utils";

const FirebaseNotificationProvider = () => {
  const dispatch = useDispatch();
  const [currentAppState, setCurrentAppState] = React.useState(
    AppState.currentState
  );

  const [token, setToken] = React.useState("");
  let notifyService;
  // const token = useSelector((state) => state.auth.token);
  // const paxMachineInfo = useSelector((state) => state.hardware.paxMachineInfo);
  // const visibleEnterPin = useSelector((state) => state?.app?.visibleEnterPin);

  const [, submitActiveFirebase] = useAxiosMutation({
    ...activeFirebase(),
    isLoadingDefault: false,
    onSuccess: (data, response) => {
    }
  })

  const initialToken = async () => {
    const _token = await getAuthToken();
    saveFcmToken(token);
    setToken(_token);
  }

  React.useEffect(() => {
    initialToken();
  }, []);

  React.useEffect(() => {
    notifyService = new NotifService(onClickedNotifyMessage);
  }, [token]);

  const onForegroundMessage = (data) => {
    // TODO: process message on foreground state
    // if (_.get(data, 'data.key') === 'AUTO_CLOSE') {
    //   handleAutoClose()
    //   return
    // }
    // dispatch({
    //   type: "HANDLE_NOTIFICATION_WHEN_HAVE_A_APPOINTMENT",
    //   payload: data,
    // });
    alert('có appointment')
    notifyService?.firebaseNotify(data);
  };

  const onBackgroundMessage = ({ data }) => {
    // TODO: process message on background state
    // if (_.get(data, 'data.key') === 'AUTO_CLOSE') {
    //   handleAutoClose()
    // }
  };

  const onOpenedApp = ({ data }) => {
    // TODO: process message on onOpenedApp
  };

  const onMessageError = () => {
    // TODO: process message error
  };

  const onClickedNotifyMessage = () => {
    if (token) {
      NavigationServices.navigate("HpOneHomeStack");
      notifyService?.resetBadgeNumber();
    } else {
      NavigationService.navigate("AuthStack");
    }
  };

  const firebaseToken = useFirebaseNotification({
    onForegroundMessage,
    onBackgroundMessage,
    onOpenedApp,
    onMessageError,
  });

  // TODO : save redux app local

  const _handleAppStateChange = (nextAppState) => {
    setCurrentAppState(nextAppState);
  };

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    notifyService = new NotifService(onClickedNotifyMessage);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  // call server update token when firebase token change

  const getUniqueDeviceId = () => {
    return DeviceInfo.getUniqueId();
  }

  const callActiveFirebase = async (firebaseToken) => {
    const deviceId = await getUniqueDeviceId();
    const data = {
      deviceId,
      firebaseToken,
    }
    const body = await activeFirebase(data);
    submitActiveFirebase(body.params);
  }

  React.useEffect(() => {
    if (firebaseToken) {
      callActiveFirebase(firebaseToken);
    }
  }, [firebaseToken]);

  return null;
};

export default FirebaseNotificationProvider;
