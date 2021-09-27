import React from "react";
import { getStaffById, useAxiosQuery } from '@src/apis';
import { useSelector } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {

  const { staff } = useSelector(state => state.auth);

  const [, getStaffEditProfile] = useAxiosQuery({
    ...getStaffById(staff.staffId),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        NavigationService.navigate(screenNames.EditProfileScreen, { staffProfile: data });
      }
    },
  });

  return {
    onEditProfile: () => {
      NavigationService.navigate(screenNames.EditProfileScreen);
    },
    goToNotification: () => {
      NavigationService.navigate(screenNames.NotificationScreen)
    },
  };
};
