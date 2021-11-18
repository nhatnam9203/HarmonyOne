import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { app, staff as staffAction, appointment, notification } from '@redux/slices';
import { AppLoading } from '@shared/components/AppLoading';
import { getDeviceId, getDeviceName } from '@shared/services/Device';
import { guid } from "@shared/utils";
import { images, colors, fonts } from "@shared/themes";
import { getStaffByDate, getAppointmentByDate, useAxiosQuery, getCountUnReadOfNotification } from "@src/apis";
import { StyleSheet, Image, Platform } from "react-native";
import VersionCheck from 'react-native-version-check';
import Configs from '@src/config';
import DeviceInfo from "react-native-device-info";
import moment from "moment";
import DropdownAlert from 'react-native-dropdownalert';

const signalR = require("@microsoft/signalr");

export const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();

  const appLoading = useSelector((state) => state.app.appLoading);
  const {
    app: {
      isHome = false,
      isError = false,
      messageError = "",
      errorType = "info",
      titleError = "",
    },
    auth: { staff },
    appointment: {
      appointmentDate,
    },

  } = useSelector(state => state);

  const alertRef = React.useRef();


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
      try {
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
      } catch (err) {
        console.log({ err });
      }
    }
  };

  React.useEffect(() => {
    if (isError) {
      alertRef?.current?.alertWithType(errorType, titleError, messageError);
    }
  }, [isError]);

  // isError = false,
  // messageError = "",
  // errorType = "info",
  // titleError = "",

  React.useEffect(() => {
    resetAlert()
  }, []);

  const resetAlert = () => {
    dispatch(
      app.setError({
        isError: false,
        messageError: "",
        errorType: "info",
        titleError: "",
      }));
  }


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
      <DropdownAlert
        onClose={() => {
          resetAlert();
        }}
        ref={alertRef}
        closeInterval={2000}
        infoColor="#1B68AC"
        errorColor={colors.red}
        titleStyle={styles.titleAlertStyle}
        messageStyle={styles.messageAlertStyle}
        defaultContainer={styles.alertStyle}
        containerStyle={styles.containerStyle}
        renderImage={() => <Image source={images.harmonyPay} style={styles.iconHarmonyPay} />}
      />
    </AppStateContext.Provider>
  );
};

const styles = StyleSheet.create({
  messageAlertStyle: {
    fontSize: scaleFont(15),
    color: "white",
    fontFamily: fonts.REGULAR
  },

  titleAlertStyle: {
    fontSize: scaleFont(19),
    color: "white",
    fontFamily: fonts.BOLD
  },

  containerStyle: {
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "blue"
  },

  alertStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingLeft: 20,
    paddingVertical : 5,
    // paddingBottom: 8
  },

  iconHarmonyPay: {
    width: scaleWidth(45),
    height: scaleWidth(45),
    tintColor: "white",
    marginTop : Platform.OS == "ios" ? scaleWidth(5) : scaleWidth(15)
  }

});