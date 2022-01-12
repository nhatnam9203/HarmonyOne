import React, { createContext } from 'react';
import codePush from 'react-native-code-push';

const log = (obj, message = '') => {
  // Logger.log(`[CodePushProvider] ${message}`, obj);
  console.log(message);
};

export const CodePushContext = createContext({});

export const CodePushProvider = ({ children }) => {
  const [progress, setProgress] = React.useState(0);
  const [progressComplete, setProgressComplete] = React.useState([]); //object: <id:string, callback: void>
  const [codePushSyncStatus, setCodePushStatus] = React.useState(0);

  // React useEffect
  React.useEffect(() => {
    // codePush.disallowRestart();
    codePushCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (
      codePushSyncStatus === codePush.SyncStatus.UP_TO_DATE ||
      codePushSyncStatus === codePush.SyncStatus.UPDATE_IGNORED ||
      codePushSyncStatus === codePush.SyncStatus.UNKNOWN_ERROR
    ) {
      codePushProcessComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codePushSyncStatus]);

  // CodePush callback
  const codePushDownloadProgress = ({ receivedBytes, totalBytes }) => {
    setProgress(Math.round((receivedBytes / totalBytes).toFixed(2) * 100));
  };

  const codePushProcessComplete = async () => {
    // await dispatch(app.loadingSuccess());
    progressComplete?.forEach(
      x => x && typeof x?.delegate === 'function' && x?.delegate(),
    );
  };

  const codePushStatusChange = status => {
    if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
      codePush.allowRestart();
      setTimeout(() => {
        codePush.restartApp();
        // codePush.disallowRestart();
      }, 300);

      return;
    }

    setCodePushStatus(status);
  };

  const codePushSync = async () => {
    const defaultOption = {
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '\nUpdate code:\n',
      },
      // installMode: codePush.InstallMode.IMMEDIATE,
    };

    await codePush.sync(
      defaultOption,
      codePushStatusChange,
      codePushDownloadProgress,
    );
  };

  // Processing
  const codePushCheck = async () => {
    const timeOutNetWork = new Promise(resolve => {
      setTimeout(() => {
        resolve('NET_WORK_TIME_OUT');
      }, 10000);
    });

    try {
      const update = await new Promise.race([
        codePush.checkForUpdate(),
        timeOutNetWork,
      ]);

      log(update, 'checkUpdateCodePush');
      console.log(update);

      if (update && update !== 'NET_WORK_TIME_OUT') {
        // Trường hợp có update
        if (update.isFirstRun && update.description) {
          // Display a "what's new?" modal
          log(update, 'CodePush Show Dialog AWAITING_USER_ACTION isFirstRun');
          setCodePushStatus(codePush.SyncStatus.AWAITING_USER_ACTION);
        } else if (update.failedInstall) {
          /* đã update failed */
          log(update, 'CodePush Show Dialog UPDATE_INSTALLED failed');
          setCodePushStatus(codePush.SyncStatus.UPDATE_IGNORED);
        } else {
          log(update, 'CodePush Show Dialog AWAITING_USER_ACTION ');
          setCodePushStatus(codePush.SyncStatus.AWAITING_USER_ACTION);
          await codePushSync();
        }
      } else {
        // not update
        log(null, 'CodePush Show Dialog UP_TO_DATE ');
        setCodePushStatus(codePush.SyncStatus.UP_TO_DATE);
      }
    } catch (err) {
      setCodePushStatus(codePush.SyncStatus.UP_TO_DATE);
      console.log('==========> CodePush error:' + err);
    }
  };

  const addPushCodeCompleteCallback = (id, delegate) => {
    if (!id || !delegate) {
      return;
    }

    const isExistedIndex = progressComplete?.findIndex(x => x.id === id);
    if (isExistedIndex >= 0) {
      let clones = [...(progressComplete || [])];
      clones[isExistedIndex] = { id, delegate };
      setProgressComplete(clones);
    } else {
      setProgressComplete([...(progressComplete || []), { id, delegate }]);
    }

    if (
      codePushSyncStatus === codePush.SyncStatus.UP_TO_DATE ||
      codePushSyncStatus === codePush.SyncStatus.UPDATE_IGNORED ||
      codePushSyncStatus === codePush.SyncStatus.UNKNOWN_ERROR
    ) {
      if (delegate && typeof delegate === 'function') {
        delegate();
      }
    }
  };

  const removePushCodeCompleteCallback = id => {
    if (!id) {
      return;
    }
    let clone = [...progressComplete];
    setProgressComplete(clone?.filter(x => x?.id !== id));
  };

  // React render
  return (
    <CodePushContext.Provider
      value={{
        progress,
        addPushCodeCompleteCallback,
        removePushCodeCompleteCallback,
        codePushCheck,
      }}>
      {children}
    </CodePushContext.Provider>
  );
};
