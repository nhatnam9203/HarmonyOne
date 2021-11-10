import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, DialogConfirm } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Switch } from "react-native-paper";
import NavigationService from '@navigation/NavigationService'

export const Layout = ({
  refDialogSignout,
  onLogout,
  toggleQuickLogin,
  isQuickLogin,
}) => {

  const [t] = useTranslation();

  const harmonyLink = `https://www.harmonypayment.com/home`;

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Settings')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          {/**************************************** SECURITY ****************************************/}
          <Title content={t('Security')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() =>
              NavigationService.navigate(screenNames.ChangePincodeScreen)
            }
            renderText={() => <Text style={styles.txtItem}>{t('Change PIN code')}</Text>}
          />
          <IconButton
            iconComponent={() => <SwitchButton value={isQuickLogin} toggle={toggleQuickLogin} />}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{t('Biometric login')}</Text>}
          />
          <View style={styles.seperateLine} />

          {/**************************************** SUPPORT ****************************************/}
          <Title content={t('Support')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => Linking.openURL(harmonyLink)}
            renderText={() => <Text style={styles.txtItem}>{t('Help & FAQ')}</Text>}
          />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{t('Feed back')}</Text>}
            onPress={() =>
              NavigationService.navigate(screenNames.FeedbackScreen)
            }
          />
          <View style={styles.seperateLine} />

          {/**************************************** ABOUT ****************************************/}
          <Title content={t('About')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => Linking.openURL(harmonyLink)}
            renderText={() => <Text style={styles.txtItem}>{t('Privacy policy')}</Text>}
          />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => Linking.openURL(harmonyLink)}
            renderText={() => <Text style={styles.txtItem}>{t('Terms')}</Text>}
          />
          <View style={styles.seperateLine} />

          {/**************************************** ACCOUNT ****************************************/}
          <Title content={t('Account')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{t('Sign out')}</Text>}
            onPress={() => refDialogSignout?.current?.show()}
          />

          <DialogConfirm
            ref={refDialogSignout}
            title={t("Warning !")}
            titleContent={
              t("Are you sure yout want to log out of your account from this device ?")
            }
            onConfirmYes={onLogout}
            onModalHide={() => { }}
          />

        </View>
      </SingleScreenLayout>
    </View>
  );
};

const Title = ({ content = '' }) => (
  <Text style={styles.title}>{content}</Text>
)

const SwitchButton = ({ value, toggle }) => {
  return (
    <Switch
      value={value}
      onValueChange={()=>toggle()}
      color={colors.ocean_blue}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
  },

  iconStyle: {
    width: scaleWidth(11),
    height: scaleWidth(11),
    resizeMode: 'contain'
  },
  txtItem: {
    fontSize: scaleFont(16),
    color: colors.greyish_brown_40,
    fontFamily: fonts.REGULAR
  },
  rowReverse: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginBottom: scaleHeight(16)
  },
  seperateLine: {
    width: '100%',
    height: 1,
    backgroundColor: "#eeeeee",
    marginBottom: scaleHeight(16)
  },
  title: {
    fontSize: scaleFont(20),
    color: '#0D3C53',
    fontFamily: fonts.MEDIUM,
    marginBottom: scaleHeight(16)
  }
});
