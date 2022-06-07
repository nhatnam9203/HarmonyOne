import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { HeaderBooking } from "../../widgets";
import { ServicePage } from "./ServicePage";
import { ProductPage } from "./ProductPage";
import { GiftCardPage } from "./GiftCardPage";
import {  DialogActiveGiftCard } from "@shared/components";
import { translate } from "@localize";


const { Navigator, Screen } = createMaterialTopTabNavigator();

export const Layout = ({
  isAddMore,
  onBack,
  dialogActiveGiftCard,
  onCheckGiftCardSucces,
  showDialogGiftCard,
}) => {  

  return (
    <View style={styles.container}>
      <DialogActiveGiftCard
        ref={dialogActiveGiftCard}
        title={translate("Enter gift card serial number")}
        onConfirmYes={() => { }}
        onModalHide={() => { }}
        onSuccess={onCheckGiftCardSucces} 
      />
      <HeaderBooking
        step={1}
        title={translate('txtSelectServiceProduct')}
        onPressBack={onBack}
        renderRight={() =>
          <Pressable
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            onPress={showDialogGiftCard}
          >
            <Image
              source={images.iconReportGiftcard}
              style={styles.iconGiftCard}
            />
          </Pressable>
        }
      />
      <View style={styles.content}>
        <Navigator
          initialRouteName="ServicePage"
          swipeEnabled={false}
          tabBarOptions={{
            indicatorStyle: {
              height: 4,
              backgroundColor: colors.ocean_blue,
              width: scaleWidth(80),
            },
            labelStyle: {
              fontFamily: fonts.REGULAR,
              fontSize: scaleFont(16),
              marginLeft: -scaleWidth(24),
            },
            style: {
              backgroundColor: colors.white,
              width: scaleWidth(200),
              marginHorizontal: scaleWidth(16),
              borderBottomColor: 'transparent',
              elevation: 0
            },
            inactiveTintColor: "#404040",
            activeTintColor: colors.ocean_blue,
            allowFontScaling: false
          }}
        >
          <Screen {...ServicePage} />
          <Screen {...ProductPage} />
          {/* <Screen {...GiftCardPage} /> */}
        </Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  iconGiftCard: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    tintColor: "white"
  }
});
