import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { images, layouts, textStyles, fonts, colors } from '@shared/themes';
import { Button, FocusBar } from '@shared/components';
import { useTranslation } from 'react-i18next';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export const Layout = ({
  onChangeInputCode,
  pinCode = '',
  loginStaff,
  isLoading,
  forgotPinCode,
  useAnotherMID,
  isQuickLogin
}) => {
  const [t] = useTranslation();

  return (
    <View style={layouts.fill}>
      <FocusBar barStyle={"dark-content"} />
      <View style={styles.container}>
        <View style={layouts.marginVertical} />
        <Text style={textStyles.sf_pt_medium_17_500}>{t('Sign In')}</Text>
        <Image
          source={images.iconSignIn}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.marginHeight} />
        <Text
          style={[
            layouts.sf_pt_medium_17_500,
            { fontSize: scaleFont(20), color: colors.bluegrey },
          ]}>
          {t('Enter your PIN code')}
        </Text>
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
          label={t('Sign In')}
          width="100%"
          highlight={pinCode?.length === 4}
          disabled={pinCode?.length !== 4}
          isLoading={isLoading}
          onPress={loginStaff}
        />
        <View style={layouts.marginVertical} />
        <TouchableOpacity onPress={forgotPinCode} style={styles.btnLink}>
          <Text style={styles.txtLink}>{t('Forgot Pin code ?')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={useAnotherMID} style={styles.btnLink}>
          <Text style={styles.txtLink}>{t('Use another MID')}</Text>
        </TouchableOpacity>
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

  logo: {
    marginTop: scaleHeight(45),
    width: scaleWidth(180),
    height: scaleHeight(112),
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
  },

  dotInput: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(300),
    backgroundColor: '#7B99BA',
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
});
