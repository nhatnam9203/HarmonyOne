import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';
import { Text } from '@components';
import { logoHarmony } from '@assets';
import { Input, ButtonContinue, WhatIsMerchant } from './widget';
import { animatedHook, logicLogin } from './customHook';
import NavigationService from '@navigation/NavigationService';
import styles from './styles';

const index = () => {
  const [isOpenInput, setOpenInput] = React.useState(false);

  const [animatedInput, bottomAnimated, fontSizeAnimated, leftAnimated] =
    animatedHook();

  const [valueMID, onChangeMID, onPressContinue] = logicLogin();

  const openInput = () => {
    setOpenInput(true);
    animatedInput();
  };

  const linkToWhatIsMerchantID = () => {
    NavigationService.navigate('WhatIsMerchant');
  };

  return (
    <View style={styles.container}>
      <Text fontFamily="medium" style={styles.title}>
        {' '}
        Sign In{' '}
      </Text>
      <Image source={logoHarmony} style={styles.logo} resizeMode="contain" />

      <Input
        onPress={openInput}
        isOpenInput={isOpenInput}
        bottomAnimated={bottomAnimated}
        fontSizeAnimated={fontSizeAnimated}
        leftAnimated={leftAnimated}
        valueMID={valueMID}
        onChangeMID={onChangeMID}
      />
      <ButtonContinue
        isActive={valueMID.toString().length > 0}
        onPress={onPressContinue}
      />
      <WhatIsMerchant onPress={linkToWhatIsMerchantID} />
    </View>
  );
};

export default index;
