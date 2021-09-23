import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { useAxiosQuery, useAxiosMutation, deleteCustomer, editCustomer } from '@src/apis';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

  const { customerDetail } = useSelector(state => state.customer);
  const [customerIdDelete, setCustomerIdDelete] = React.useState(false);
  const [isPopupDeleteCustomer, showPopupDeleteCustomer] = React.useState(false);

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
        label: t('Edit'),
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
