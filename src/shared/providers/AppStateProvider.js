import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { app, staff as staffAction, appointment, notification } from '@redux/slices';
import { AppLoading } from '@shared/components/AppLoading';
import { getDeviceId, getDeviceName } from '@shared/services/Device';
import { guid } from "@shared/utils";
import { getStaffByDate, getAppointmentByDate, useAxiosQuery, getCountUnReadOfNotification } from "@src/apis";
import VersionCheck from 'react-native-version-check';
import Configs from '@src/config';
import DeviceInfo from "react-native-device-info";
import moment from "moment";

const signalR = require("@microsoft/signalr");

export const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();

  const appLoading = useSelector((state) => state.app.appLoading);
  const {
    app: { isHome = false },
    auth: { staff },
    appointment: {
      appointmentDate,
    },

  } = useSelector(state => state);


  const [, fetchStaffByDate] = useAxiosQuery({
    ...getStaffByDate(
      staff?.merchantId,
      moment(appointmentDate).format("YYYY-MM-DD"),
    ),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      dispatch(staffAction.setStaffByDate(data));
    },
  });

  const [, fetchAppointmentByDate] = useAxiosQuery({
    ...getAppointmentByDate(moment(appointmentDate).format("YYYY-MM-DD")),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      dispatch(appointment.setBlockTimeBydate(data));
    },
  });

  const [, fetchCountUnread] = useAxiosQuery({
    ...getCountUnReadOfNotification(),
    enabled: false,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      dispatch(notification.setCountUnread(data));
    },
  });


  const onCancelLoading = () => {
    dispatch(app.hideLoading()); // loading salon
  };


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

  const connectSignalR = () => {
    if (staff) {
      const deviceId = `${DeviceInfo.getDeviceId()}_${guid()}`;
      const urlConnect = `notification/?merchantId=${staff?.merchantId}&Title=Merchant&kind=calendar&deviceId=${deviceId}`
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(
          `${Configs.SOCKET_URL}notification/?merchantId=${staff?.merchantId}&Title=Merchant&kind=calendar&deviceId=${guid()}`,
          {
            transport:
              signalR.HttpTransportType.LongPolling |
              signalR.HttpTransportType.WebSockets,
          }
        )
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connection.on("ListWaNotification", (data) => {
        const dataParse = JSON.parse(data);
         const typeData = dataParse?.data?.Type;
        if (typeData) {
          switch (typeData) {
            case "appointment_update":
            case "appointment_add":
              fetchAppointmentByDate();
              fetchCountUnread();
              break;

            case "update_merchant":

              break;

            default:
              break;
          }
        } else if (dataParse?.type) {
          switch (dataParse?.type) {
            case "staff_update":
              fetchStaffByDate();
              break;

            default:
              break;
          }
        }
      });

      connection.onclose(async (error) => {
      });

      connection.start().then(async () => {

      })
        .catch((error) => {

        });
    }
  };


  // React useEffect
  React.useEffect(() => {
    if (staff && isHome) {
      connectSignalR();
    }
    // loadDeviceInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff, isHome]);

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
