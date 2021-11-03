import NavigationService from '@navigation/NavigationService';
import { CodePushContext } from '@shared/providers/CodePushProvider';
import { sleep } from '@shared/utils/app';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from "@react-native-community/async-storage";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const { staff } = useSelector((state) => state.auth);

  const init = async () => {
    await sleep(1500);
    // …do multiple async tasks
  };

  const {
    progress,
    addPushCodeCompleteCallback,
    removePushCodeCompleteCallback,
  } = React.useContext(CodePushContext);

  const [finishedLoadCodePush, setFinishedLoadCodePush] = React.useState(false);
  const [finishedLoadApp, setLoadApp] = React.useState(false);

  // React useEffect
  React.useEffect(() => {
    // SplashScreen.hide();

    addPushCodeCompleteCallback('splashscreen', () => {
      setFinishedLoadCodePush(true);
    });

    init().finally(() => {
      return setLoadApp(true);
    }); // do navigation chưa ready, mà codepush xong thì start app

    return () => {
      removePushCodeCompleteCallback('splashscreen');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateMainScreen = async () => {
    if (staff) {
      const merchantID = await AsyncStorage.getItem("@merchantID");

      if (merchantID) {

        NavigationService.replace('AuthStack', { screen: screenNames.PinScreen });
      } else {
        NavigationService.replace('AuthStack');
      }
      // NavigationService.replace("HpOneStack");
    }
    else {
      NavigationService.replace('AuthStack');
    }
  }

  React.useEffect(() => {
    if (finishedLoadCodePush && finishedLoadApp) {
      navigateMainScreen();

    }
  }, [finishedLoadCodePush, finishedLoadApp, staff]);

  return { progress };
};
