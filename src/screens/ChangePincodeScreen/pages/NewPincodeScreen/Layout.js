import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { images, layouts, textStyles, fonts, colors } from '@shared/themes';
import { Button } from '@shared/components';
import { useTranslation } from 'react-i18next';
import { SingleScreenLayout } from '@shared/layouts';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export const Layout = ({
  onChangeInputCode,
  onChangeNewPinCode,
  newPincode,
  pinCode = '',
  forgotPinCode,
  onSubmit
}) => {
  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Change PIN Code')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <View style={styles.content}>

          <View style={styles.marginHeight} />
          <Text
            style={[
              layouts.sf_pt_medium_17_500,
              { fontSize: scaleFont(18), color: "#7A98BB", fontFamily: fonts.MEDIUM },
            ]}>
            {t('New PIN code')}
          </Text>
          <View style={styles.marginHeight} />
          <View style={styles.containerInput}>
            <SmoothPinCodeInput
              placeholder={<View style={styles.dotInput} />}
              mask={<View style={[styles.dotInput, { opacity: 1 }]} />}
              // maskDelay={500}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              cellSize={scaleWidth(26)}
              value={pinCode}
              onTextChange={onChangeInputCode}
              autoFocus={true}
            />
          </View>
          <View style={styles.marginHeight} />
          <Text
            style={[
              layouts.sf_pt_medium_17_500,
              { fontSize: scaleFont(18), color: "#7A98BB", fontFamily: fonts.MEDIUM },
            ]}>
            {t('Confirm new PIN code')}
          </Text>
          <View style={styles.marginHeight} />
          <View style={styles.containerInput}>
            <SmoothPinCodeInput
              placeholder={<View style={styles.dotInput} />}
              mask={<View style={[styles.dotInput, { opacity: 1 }]} />}
              // maskDelay={500}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              cellSize={scaleWidth(26)}
              value={newPincode}
              onTextChange={onChangeNewPinCode}
            />
          </View>

        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    alignItems: "center"
  },


  logo: {
    width: scaleWidth(80),
    height: scaleHeight(80),
    marginTop: scaleHeight(30)
  },

  marginHeight: {
    height: scaleHeight(35),
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
    height: scaleHeight(20),
    borderRadius: scaleWidth(10),
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
