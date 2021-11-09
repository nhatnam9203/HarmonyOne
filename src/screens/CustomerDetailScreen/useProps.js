import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { guid } from "@shared/utils";
import { useAxiosQuery, useAxiosMutation, deleteCustomer, editCustomer } from '@src/apis';
import { useSelector } from "react-redux";
import DeviceInfo from "react-native-device-info";
import NavigationService from '@navigation/NavigationService';
import Configs from '@src/config';
const signalR = require("@microsoft/signalr");


export const useProps = (props) => {

  const { customerDetail } = useSelector(state => state.customer);
  const [customerIdDelete, setCustomerIdDelete] = React.useState(false);
  const [isPopupDeleteCustomer, showPopupDeleteCustomer] = React.useState(false);
  const [connectionSignalR, setConnectionSignalR] = React.useState(null);

  const { navigation } = props;
  const { auth: { staff } } = useSelector(state => state);
  const mounted = React.useRef(false);
  const dialogDeleteCustomer = React.useRef();

  const [t] = useTranslation();

  const [, submitDeleteCustomer] = useAxiosQuery({
    ...deleteCustomer(customerDetail?.customerId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      props?.route?.params?.refreshFromScreen();
      NavigationService.navigate(screenNames.CustomersScreen);
    },
  });

  return {
    customerDetail,
    dialogDeleteCustomer,
    submitDeleteCustomer,
    getActionSheets: () => [
      {
        id: 'edit-customer',
        label: t('Edit profile'),
        func: () => {
          NavigationService.navigate(screenNames.CustomerNewScreen, { isEdit: true, customerDetail });
        },
      },
      {
        id: 'delete-customer',
        label: t('Delete'),
        textColor: colors.red,
        func: () => {
          setTimeout(() => {
            dialogDeleteCustomer?.current?.show();
          }, 500);
        }
      },
    ],
  };
};
