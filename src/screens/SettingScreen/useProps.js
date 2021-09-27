import React from "react";
import { auth } from "@redux/slices";
import { useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService'

export const useProps = (_params) => {

  const dispatch = useDispatch();
  const refDialogSignout = React.useRef();

  return {
    refDialogSignout,

    onLogout: () => {
      NavigationService.navigate('AuthStack', { isLogout : true });
      dispatch(auth.signOutApp());
    },
  };
};
