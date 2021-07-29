import React from 'react';
import { Animated } from 'react-native';

import NavigationService from '@navigation/NavigationService';
import { useDispatch } from 'react-redux';
import actions from '@actions';

const logicLogin = () => {
  const dispatch = useDispatch();
  const [valueMID, setValueMID] = React.useState('');

  const onChangeMID = (txt) => {
    setValueMID(txt);
  };

  const onPressContinue = () => {
    dispatch(actions.authAction.loginMID(valueMID));
  };

  return [valueMID, onChangeMID, onPressContinue];
};

export default logicLogin;
