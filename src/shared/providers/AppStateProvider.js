import React, { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appMerchant } from "@redux/slices";
import { AppLoading } from "@shared/components/AppLoading";
import { ExportLoading } from "@shared/components/ExportLoading";
import { getDeviceId, getDeviceName } from "@shared/services/Device";
import actions from "@actions";
import VersionCheck from "react-native-version-check";
import Configs from "@configs";

const log = (obj, message = "") => {
  Logger.log(`[CodePushProvider] ${message}`, obj);
};

export const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();
  const appLoading = useSelector((state) => state.app.loading);
  const merchantLoading = useSelector((state) => state.appMerchant.appLoading);

  const exportLoading = useSelector((state) => state.appMerchant.exportLoading);
  const onCancelLoading = () => {
    dispatch(appMerchant.hideLoading()); // loading retailer
    dispatch(actions.app.stopLoadingApp()); // loading salon
  };

  const onCancelExportLoading = () => {
    dispatch(appMerchant.hideExportLoading());
  };

  const loadDeviceInfo = async () => {
    const deviceId = await getDeviceId();
    const deviceName = await getDeviceName();
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: "appStore",
    });

    await dispatch(actions.dataLocal.updateDeviceId(deviceId));
    await dispatch(actions.dataLocal.updateDeviceName(deviceName));
    await dispatch(
      actions.dataLocal.updateVersionApp(latestVersion ?? Configs.VERSION)
    );

    await dispatch(appMerchant.setDeviceInfo({ deviceId, deviceName }));
  };

  // React useEffect
  React.useEffect(() => {
    loadDeviceInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React render
  return (
    <AppStateContext.Provider value={{}}>
      {children}
      <AppLoading
        loading={appLoading || merchantLoading}
        onCancelLoading={onCancelLoading}
      />
      <ExportLoading
        loading={exportLoading}
        onCancelLoading={onCancelExportLoading}
      />
    </AppStateContext.Provider>
  );
};
