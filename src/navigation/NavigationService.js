import { StackActions } from '@react-navigation/native';
import * as React from 'react';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

function navigate(name, params = null) {
  if (isReadyRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}

function replace(name, params = null,) {
  if (isReadyRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
}

function back() {
  navigationRef.current?.goBack();
}

export default {
  navigate,
  back,
  replace,
};
