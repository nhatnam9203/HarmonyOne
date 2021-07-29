import { images, layouts, textStyles, fonts } from '@shared/themes';
import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { InputMerchantID } from './widgets';
import { Button } from '@shared/components';
import { useTranslation } from 'react-i18next';

export const Layout = ({
  onChangeMID,
  merchantID,
  isLoading,
  whatMerchantID,
}) => {
  const [t] = useTranslation();

  return (
    <View style={layouts.fill}>
      <View style={styles.container}>
        <View style={layouts.marginVertical} />
        <Text style={textStyles.sf_pt_medium_17_500}>{t('Sign In')}</Text>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.inputContent}>
          <InputMerchantID onChangeMID={onChangeMID} />
        </View>
        <View style={styles.marginHeight} />
        <Button
          width="100%"
          highlight={merchantID?.length === 4}
          disabled={merchantID?.length !== 4}
          isLoading={isLoading}
        />
        <TouchableOpacity
          onPress={whatMerchantID}
          style={styles.btnWhatIsMerchant}>
          <Text style={styles.txtWhatIsMerchant}>
            {t('What is Merchant ID ?')}
          </Text>
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
    height: scaleHeight(40),
  },

  btnWhatIsMerchant: {
    width: scaleWidth(110),
    height: scaleHeight(16),
    marginTop: scaleHeight(18),
  },

  txtWhatIsMerchant: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: '#27aae1',
  },
});
