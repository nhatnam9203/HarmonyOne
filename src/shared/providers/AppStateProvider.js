import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '@redux/slices';
import { AppLoading } from '@shared/components/AppLoading';
// import { ExportLoading } from '@shared/components/ExportLoading';
import { getDeviceId, getDeviceName } from '@shared/services/Device';
import VersionCheck from 'react-native-version-check';

export const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();

  const appLoading = useSelector((state) => state.app.appLoading);

  const onCancelLoading = () => {
    dispatch(app.hideLoading()); // loading salon
  };

  // const onCancelExportLoading = () => {
  //   dispatch(appMerchant.hideExportLoading());
  // };

  const loadDeviceInfo = async () => {
    const deviceId = await getDeviceId();
    const deviceName = await getDeviceName();
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: 'appStore',
    });

    // await dispatch(actions.dataLocal.updateDeviceId(deviceId));
    // await dispatch(actions.dataLocal.updateDeviceName(deviceName));
    // await dispatch(
    //   actions.dataLocal.updateVersionApp(latestVersion ?? Configs.VERSION),
    // );

    // await dispatch(appMerchant.setDeviceInfo({ deviceId, deviceName }));
  };

  // React useEffect
  React.useEffect(() => {
    // loadDeviceInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React render
  return (
    <AppStateContext.Provider value={{}}>
      {children}
      <AppLoading loading={appLoading} onCancelLoading={onCancelLoading} />
      {/* <ExportLoading
        loading={exportLoading}
        onCancelLoading={onCancelExportLoading}
      /> */}
    </AppStateContext.Provider>
  );
};
