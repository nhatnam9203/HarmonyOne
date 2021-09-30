import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";

export const useProps = (_params) => {

  const [t] = useTranslation();

  return {
    getActionSheets: (category) => [
      {
        id: 'edit-campaign',
        label: t('Edit campaign'),
        func: () => { },
      },
      {
        id: 'delete-campaign',
        label: t('Delete'),
        textColor: colors.red,
        func: () => { alert('chưa có api delete campaign') }
      },
    ],
  };
};
