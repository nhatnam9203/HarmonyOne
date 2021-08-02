import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { UserInfo, Title, Link, PopupSignOut } from './widget';
import { scaleHeight, scaleWidth } from '@utils';
import { Text } from '@components';
import styles from './style';
import { Switch } from 'react-native-paper';
import NavigationService from '@navigation/NavigationService';
import { logout } from '@actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const index = () => {
  const dispatch = useDispatch();
  const { staffId, token } = useSelector((state) => state.auth.staff);

  const [isSwitch, setSwitch] = React.useState(false);
  const [isPopupSignOut, setPopupSignOut] = React.useState(false);

  const editProfile = () => {
    NavigationService.navigate('EditProfile');
  };

  const changePincode = () => {
    NavigationService.navigate('ChangePincode');
  };

  const feedBack = () => {
    NavigationService.navigate('FeedBack');
  };

  const signOut = () => {
    setPopupSignOut(false);
    const body = {};
    dispatch(logout(body, token));
  };

  return (
    <ScrollView style={styles.container}>
      <UserInfo onEdit={editProfile} />
      <Title text="Security" />
      <Link text="Change pin code" onPress={changePincode} />
      <TouchableOpacity style={styles.row}>
        <Text color="#404040" fontSize={scaleWidth(4.3)}>
          Biometric login
        </Text>
        <Switch color="#1366AE" value={isSwitch} onValueChange={setSwitch} />
      </TouchableOpacity>
      <View style={styles.line} />

      <Title text="Support" />
      <Link text="Help & FAQ" />
      <Link text="Feed back" onPress={feedBack} />
      <View style={styles.line} />

      <Title text="About" />
      <Link text="Privacy policy" />
      <Link text="Term" />
      <View style={styles.line} />

      <Title text="Account" />
      <Link text="Sign out" onPress={() => setPopupSignOut(true)} />
      <PopupSignOut
        isPopupSignOut={isPopupSignOut}
        close={() => setPopupSignOut(false)}
        onPressYes={signOut}
      />
      <View style={{ height: scaleHeight(20) }} />
    </ScrollView>
  );
};

export default index;
