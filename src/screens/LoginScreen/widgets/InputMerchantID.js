import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { icon_mid } from '@assets';
import { Text } from '@components';
import { slop } from '@utils';
import * as Animatable from 'react-native-animatable';
import { colors, fonts } from '@shared/themes';

export const InputMerchantID = ({ onChangeMID }) => {
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
  const bottomAnimated = React.useRef(
    new Animated.Value(scaleHeight(0)),
  ).current;
  const fontSizeAnimated = React.useRef(
    new Animated.Value(scaleFont(15)),
  ).current;
  //   const leftAnimated = React.useRef(new Animated.Value(scaleWidth(25))).current;

  const animatedInput = () => {
    Animated.parallel([
      Animated.timing(bottomAnimated, {
        toValue: scaleHeight(64),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnimated, {
        toValue: scaleFont(20),
        duration: 300,
        useNativeDriver: false,
      }),
      //   Animated.timing(leftAnimated, {
      //     toValue: scaleWidth(16),
      //     duration: 300,
      //     useNativeDriver: false,
      //   }),
    ]).start();
  };

  const [isOpenInput, setOpenInput] = React.useState(false);
  const [valueMID, setValueMID] = React.useState('');

  const onPressInput = () => {
    setOpenInput(true);
    animatedInput();
  };

  const onHandleChangeMID = (text) => {
    setValueMID(text);
    if (onChangeMID && typeof onChangeMID === 'function') {
      onChangeMID(text);
    }
  };

  return (
    <View style={styles.containerInput}>
      <Image source={icon_mid} style={styles.inputIcon} resizeMode="contain" />
      {isOpenInput && (
        <TextInput
          value={valueMID}
          autoFocus={true}
          onChangeText={onHandleChangeMID}
          style={styles.textInput}
          keyboardType="numeric"
        />
      )}
      <AnimatedButton
        activeOpacity={1}
        onPress={onPressInput}
        hitSlop={slop}
        style={[
          styles.btnEnterYourMID,
          { bottom: bottomAnimated },
          isOpenInput && { position: 'absolute' },
        ]}>
        <Animated.Text
          fontFamily="medium"
          style={[
            styles.content,
            {
              fontSize: fontSizeAnimated,
            },
          ]}>
          Enter your Merchant ID
        </Animated.Text>
      </AnimatedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    minHeight: scaleHeight(80),
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: scaleHeight(1),
    borderBottomColor: '#c5c5c5',
    paddingVertical: scaleHeight(10),
  },

  inputIcon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },

  textInput: {
    fontFamily: fonts.REGULAR,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'center',
    fontSize: scaleHeight(15),
    color: colors.bluegrey,
    marginLeft: scaleWidth(5),
    paddingRight: scaleWidth(10),
    height: scaleHeight(24),
    flex: 1,
    width: '100%',
  },

  content: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'center',
    color: colors.bluegrey,
  },

  btnEnterYourMID: {
    flex: 1,
    width: '100%',
    // height: scaleHeight(24),
    justifyContent: 'center',
  },
});
