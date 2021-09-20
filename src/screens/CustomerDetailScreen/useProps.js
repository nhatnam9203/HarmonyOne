import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";

export const useProps = (_params) => {

  const { customerDetail } = useSelector(state => state.customer);

  const [t] = useTranslation();

  return {
    customerDetail,
    getActionSheets: () => [
      {
        id: 'edit-customer',
        label: t('Edit'),
        func: () => { },
      },
      {
        id: 'delete-customer',
        label: t('Delete'),
        textColor: colors.red,
        func: () => { }
      },
    ],
  };
};
