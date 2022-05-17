import { images, layouts, textStyles, fonts, colors } from '@shared/themes';
import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { InputMerchantID } from './widgets';
import { Button, FocusBar } from '@shared/components';
import { useTranslation } from 'react-i18next';

export const Layout = ({
  onChangeMID,
  merchantID,
  isLoading,
  whatMerchantID,
  loginMerchant,
  textMessage,
  signUp
}) => {
  const [t] = useTranslation();

  return (
    <View style={layouts.fill}>
      <FocusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={layouts.marginVertical} />
        <Text style={textStyles.sf_pt_medium_17_500}>{t('Sign In')}</Text>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.marginHeight} />

        <InputMerchantID
          onChangeMID={onChangeMID}
          valueMID={merchantID}
          isLoading={isLoading}
        />
        <View style={layouts.marginVertical} />
        {textMessage && <Text style={styles.msgError}>{textMessage}</Text>}
        <View style={styles.marginHeight} />
        <Button
          width="100%"
          highlight={true}
          disabled={merchantID?.length < 4 || !merchantID}
          isLoading={isLoading}
          onPress={loginMerchant}
        />


        <View style={styles.containerSignup}>
          <Text style={styles.txtSignup}>Don't have an account!</Text>
          <TouchableOpacity onPress={signUp}>
            <Text style={[styles.txtSignup, styles.txtBtnSignup]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

  containerSignup: {
    flexDirection: "row",
    marginTop: scaleHeight(16)
  },

  txtSignup: {
    fontSize: scaleFont(16),
    fontFamily: fonts.REGULAR,
    color: '#27aae1',
  },

  txtBtnSignup: {
    fontFamily: fonts.BOLD,
    marginLeft: scaleWidth(7),
    color: "#27aae1"
  },

  logo: {
    marginTop: scaleHeight(45),
    width: scaleWidth(180),
    height: scaleHeight(112),
  },

  inputContent: {
    marginTop: scaleHeight(40),
    flex: 0,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
  },

  marginHeight: {
    height: scaleHeight(30),
  },

  btnWhatIsMerchant: {
    width: scaleWidth(200),
    height: scaleHeight(25),
    marginTop: scaleHeight(18),
    justifyContent: 'center',
  },

  txtWhatIsMerchant: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(13),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: '#27aae1',
  },

  msgError: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(12),
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#e12727',
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
