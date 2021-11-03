import { icon_mid } from '@assets';
import { colors, fonts } from '@shared/themes';
import { slop } from '@utils';
import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomTextInput } from '@shared/components';

export const InputMerchantID = ({ onChangeMID, isLoading, valueMID }) => {
  const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

  const bottomAnimated = React.useRef(
    new Animated.Value(scaleHeight(10)),
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

  const onPressInput = () => {
    setOpenInput(true);
    animatedInput();
  };

  const onHandleChangeMID = (text) => {
    if (onChangeMID && typeof onChangeMID === 'function') {
      onChangeMID(text);
    }
  };

  return (
    <View style={styles.containerInput}>
      <View style={styles.inputContent}>
        <Image
          source={icon_mid}
          style={styles.inputIcon}
          resizeMode="contain"
        />
        {isOpenInput && (
          <CustomTextInput
            value={valueMID}
            style={{ display: 'none' }}
            autoFocus={true}
            onChangeText={onHandleChangeMID}
            inputStyle={styles.textInput}
            style={styles.inputStyle}
            keyboardType="numeric"
            clearTextOnFocus={true}
            editable={!isLoading}
          />
        )}
      </View>
      <AnimatedButton
        activeOpacity={1}
        onPress={onPressInput}
        hitSlop={slop}
        style={[styles.btnEnterYourMID, { bottom: bottomAnimated }]}>
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
    height: scaleHeight(120),
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: scaleHeight(1),
    borderBottomColor: '#c5c5c5',
    paddingVertical: scaleHeight(10),
  },

  inputContent: {
    height: scaleHeight(30),
    width: '100%',
    flexDirection: 'row',
  },

  inputStyle: {
    flex: 1,
  },

  inputIcon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    position: 'absolute',
  },

  textInput: {
    fontFamily: fonts.REGULAR,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'center',
    fontSize: scaleFont(15),
    color: colors.bluegrey,
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
    justifyContent: 'center',
    position: 'absolute',
  },
});
