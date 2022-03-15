import React from "react";
import { app } from '@src/redux/slices';
import { Alert, AppState } from "react-native";
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

  const {
    auth: { staff },
    app: { notiIntervalId },
  } = useSelector(state => state);

  const token = staff?.token;

  const dispatch = useDispatch();
  const [currentAppState, setCurrentAppState] = React.useState(
    AppState.currentState
  );

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

  React.useEffect(() => {
    notifyService = new NotifService(onClickedNotifyMessage);
  }, [token]);

  // handleNotification = () => {
  //   if (!notiIntervalId) {
  //     const intervalId = setInterval(() => {
  //       try {
  //         SoundPlayer.playSoundFile("harmony_foreground", "mp3");
  //       } catch (e) {}
  //     }, 5000);
  //     dispatch(app?.handleNotifiIntervalId(intervalId));
  //   }
  // };

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
    dispatch(app?.handleNotifiWhenHaveAppointment());

    // if(token) {
    //   handleNotification();
    // }
   
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
      NavigationService.navigate("HpOneHomeStack");
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
    if (firebaseToken && token) {
      callActiveFirebase(firebaseToken);
    }
  }, [firebaseToken, token]);

  return null;
};

export default FirebaseNotificationProvider;
