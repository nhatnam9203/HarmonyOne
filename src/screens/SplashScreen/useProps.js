import NavigationService from '@navigation/NavigationService';
import { CodePushContext } from '@shared/providers/CodePushProvider';
import { sleep } from '@shared/utils/app';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

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
      console.log('finishedLoadCodePush');
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

  React.useEffect(() => {
    if (finishedLoadCodePush && finishedLoadApp) {
      // splash complete here !
      // if not sign in -> go to sign in screen
      if (staff) {
        NavigationService.replace('HpOneStack');
      }
      // if sign in -> go to home
      else {
        NavigationService.replace('AuthStack');
      }
    }
  }, [finishedLoadCodePush, finishedLoadApp, staff]);

  return { progress };
};
