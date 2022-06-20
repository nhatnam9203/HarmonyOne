import React from 'react';
import { View, StyleSheet, Text, Linking, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, DialogConfirm } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Switch } from "react-native-paper";
import NavigationService from '@navigation/NavigationService';
import ic_english from "../../localization/flags/ic-flag-english.png";
import ic_vietnam from "../../localization/flags/ic-flag-vietnam.png";
import { useSelector } from "react-redux";
import { translate } from "@localize";


export const Layout = ({
  refDialogSignout,
  onLogout,
  toggleQuickLogin,
  isQuickLogin,
}) => {
  const language = useSelector(state => state.dataLocal.language);

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('txtSettings')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          {/**************************************** SECURITY ****************************************/}
          <Title content={translate('txtSecurity')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() =>
              NavigationService.navigate(screenNames.ChangePincodeScreen)
            }
            renderText={() => <Text style={styles.txtItem}>{translate('txtChangePincode')}</Text>}
          />
          <IconButton
            iconComponent={() => <SwitchButton value={isQuickLogin} toggle={toggleQuickLogin} />}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{translate('txtBiometricLogin')}</Text>}
          />
          <View style={styles.seperateLine} />

          {/**************************************** SUPPORT ****************************************/}
          <Title content={translate('txtSupport')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => NavigationService.navigate(screenNames.FaqPage)}
            renderText={() => <Text style={styles.txtItem}>{translate('txtHelpFAQ')}</Text>}
          />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{translate('txtFeedback')}</Text>}
            onPress={() =>
              NavigationService.navigate(screenNames.FeedbackScreen)
            }
          />
          <View style={styles.seperateLine} />

          {/**************************************** ABOUT ****************************************/}
          <Title content={translate('txtAbout')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => NavigationService.navigate(screenNames.Privacy)}
            renderText={() => <Text style={styles.txtItem}>{translate('txtPrivacy')}</Text>}
          />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            onPress={() => NavigationService.navigate(screenNames.TermOfService)}
            renderText={() => <Text style={styles.txtItem}>{translate('txtTerms')}</Text>}
          />
          <View style={styles.seperateLine} />

          {/**************************************** LANGUAGE ****************************************/}
          <Title content={translate('txtLanguage')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{translate('txtChangeLanguage')}</Text>}
            iconComponent={() =>
              <View style={styles.rowLanguage}>
                <Image
                  style={styles.flag}
                  source={language !== "vi" ? ic_english : ic_vietnam}
                />
                <Image
                  style={styles.iconStyle}
                  source={images.iconArrow}
                />
              </View>
            }
            onPress={() => NavigationService.navigate(screenNames.LanguageScreen)}
          />
          <View style={styles.seperateLine} />

          {/**************************************** ACCOUNT ****************************************/}
          <Title content={translate('txtAccount')} />
          <IconButton
            icon={images.iconArrow}
            iconStyle={styles.iconStyle}
            style={styles.rowReverse}
            renderText={() => <Text style={styles.txtItem}>{translate('txtSignout')}</Text>}
            onPress={() => refDialogSignout?.current?.show()}
          />

          <DialogConfirm
            ref={refDialogSignout}
            title={`${translate("txtWarning")} !`}
            titleContent={
              translate("txtLogout")
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
      onValueChange={() => toggle()}
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
    backgroundColor: "#fafafa"
  },

  iconStyle: {
    width: scaleWidth(11),
    height: scaleWidth(11),
    resizeMode: 'contain'
  },
  txtItem: {
    fontSize: scaleFont(15),
    color: colors.greyish_brown_40,
    letterSpacing: 0.5
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
  },
  flag: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    marginRight: 8
  },
  rowLanguage: {
    flexDirection: "row",
    alignItems: "center"
  }
});
