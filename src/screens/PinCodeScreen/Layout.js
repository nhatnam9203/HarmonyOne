import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, Animated } from 'react-native';
import { images, layouts, textStyles, fonts, colors } from '@shared/themes';
import { Button, FocusBar } from '@shared/components';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { translate } from "@localize";

export const Layout = ({
  onChangeInputCode,
  pinCode = '',
  loginStaff,
  isLoading,
  forgotPinCode,
  useAnotherMID,
  isQuickLogin
}) => {

  return (
    <View style={layouts.fill}>
      <FocusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={layouts.marginVertical} />
        <Text style={textStyles.sf_pt_medium_17_500}>
          {translate('txtSignin')}
        </Text>
        <Image
          source={images.iconSignIn}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.marginHeight} />

        <TextPincode />

        <View style={styles.marginHeight} />
        <View style={styles.containerInput}>
          <SmoothPinCodeInput
            placeholder={<View style={styles.dotInput} />}
            mask={<View style={[styles.dotInput, { opacity: 1 }]} />}
            textStyle={{ fontFamily: fonts.MEDIUM, fontSize: scaleFont(19), color: "#404040" }}
            // maskDelay={500}
            password={true}
            cellStyle={null}
            cellStyleFocused={null}
            cellSize={scaleWidth(26)}
            value={pinCode}
            onTextChange={onChangeInputCode}
            autoFocus={isQuickLogin ? false : true}
          />
        </View>
        <View style={styles.marginHeight} />
        <Button
          label={translate('txtSignin')}
          width="100%"
          highlight={true}
          disabled={pinCode?.length !== 4}
          isLoading={isLoading}
          onPress={loginStaff}
        />
        <View style={layouts.marginVertical} />
        <TouchableOpacity onPress={forgotPinCode} style={styles.btnLink}>
          <Text style={styles.txtLink}>{`${translate('txtForgotPincode')} ?`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={useAnotherMID} style={styles.btnLink}>
          <Text style={styles.txtLink}>{translate('txtUserAnotherMID')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TextPincode = () => {

  const animatedValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence(
        [
          Animated.timing(animatedValue, {
            toValue: 1.09,
            duration: 700,
            useNativeDriver: true
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
          }),
        ]
      )
    ).start();
  }, [])

  return (
    <Animated.Text
      style={[
        layouts.sf_pt_medium_17_500,
        {
          fontSize: scaleFont(18), color: colors.bluegrey,
          fontFamily: fonts.MEDIUM,
          transform: [{ scale: animatedValue }]
        },
      ]}>
      {translate('txtEnterPincode')}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(50),
    backgroundColor: colors.white,
  },

  logo: {
    marginTop: scaleHeight(45),
    width: scaleWidth(180),
    height: scaleHeight(85),
  },

  marginHeight: {
    height: scaleHeight(30),
  },

  containerInput: {
    height: scaleHeight(48),
    width: scaleWidth(200),
    borderRadius: scaleHeight(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginVertical: scaleHeight(8)
  },

  dotInput: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(300),
    backgroundColor: '#8097B8',
    opacity: 0.3,
  },

  btnLink: {
    width: scaleWidth(200),
    height: scaleHeight(26),
    marginTop: scaleHeight(6),
    justifyContent: 'center',
  },

  txtLink: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(13),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: '#27aae1',
  },

  buttonDisableStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: '#2E63AA'
  },
  textDisableStyle: {
    color: "#2E63AA"
  }
});
