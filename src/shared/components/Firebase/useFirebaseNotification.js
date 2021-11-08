import AsyncStorage from "@react-native-community/async-storage";
import messaging from "@react-native-firebase/messaging";
import React from "react";

const FIREBASE_TOKEN_STORE_KEY = "fcmToken";
const SAVE_STORE_TOKEN = true;

const saveStoreToken = async (token) => {
  if (!!token) {
    // user has a device token
    await AsyncStorage.setItem(FIREBASE_TOKEN_STORE_KEY, token);
  } else {
    await AsyncStorage.removeItem(FIREBASE_TOKEN_STORE_KEY);
  }
};

function useFirebaseNotification({
  onForegroundMessage,
  onBackgroundMessage,
  onOpenedApp,
  onInit,
  onMessageError,
}) {
  const [token, setFirebaseToken] = React.useState(undefined);

  const getToken = async () => {
    let fcmToken = null;

    if (SAVE_STORE_TOKEN) {
      fcmToken = await AsyncStorage.getItem(FIREBASE_TOKEN_STORE_KEY);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        await saveStoreToken(fcmToken);
      }
    } else {
      fcmToken = await messaging().getToken();
    }

    setFirebaseToken(fcmToken);
  };

  // request when first launch app
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    switch (authStatus) {
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        //Permission has not yet been requested for your application.
        if (typeof onMessageError === "function") {
          onMessageError();
        }
        saveStoreToken(undefined);
        setFirebaseToken(null);
        break;
      case messaging.AuthorizationStatus.DENIED:
        //The user has denied notification permissions.
        if (typeof onMessageError === "function") {
          onMessageError();
        }
        saveStoreToken(undefined);
        setFirebaseToken(null);

        break;
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        registryListeners();
        break;
    }
  };

  // check permissions firebase
  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();

    switch (authStatus) {
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        //Permission has not yet been requested for your application.
        await requestUserPermission();

        break;
      case messaging.AuthorizationStatus.DENIED:
        if (typeof onMessageError === "function") {
          onMessageError();
        }
        break;
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        registryListeners();
        break;
    }
  };

  const registryListeners = () => {
    // Register background handler & Quit state messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (typeof onBackgroundMessage === "function") {
        onBackgroundMessage(remoteMessage);
      }
    });

    // Register Foreground Listeners: received message but not display notification
    messaging().onMessage(async (remoteMessage) => {
      if (typeof onForegroundMessage === "function") {
        onForegroundMessage(remoteMessage);
      }
    });

    // Register App Opening
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (typeof onOpenedApp === "function") {
        onOpenedApp(remoteMessage);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (typeof onInit === "function") {
          onInit(remoteMessage);
        }
      });
  };

  React.useEffect(() => {
    // check permissions
    checkPermission();
  }, []);

  return token;
}

export default useFirebaseNotification;
