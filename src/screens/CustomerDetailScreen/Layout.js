import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomerInfo } from "./widget";

export const Layout = ({
  customerDetail
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={'Customer details'}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            icon={images.treedot}
            iconStyle={styles.iconBell}
            style={styles.buttonBell}
            onPress={() => { }}
          />
        }
      >
        <View style={styles.content}>
          <CustomerInfo 
            firstName={customerDetail?.firstName}
            lastName={customerDetail?.lastName}
            note={customerDetail?.note}
            phone={customerDetail?.phone}
            email={customerDetail?.email}
            gender={customerDetail?.gender}
            addressPost={customerDetail?.addressPost}
            referrerPhone={customerDetail?.referrerPhone}
            birthdate={customerDetail?.birthdate}
            isVip={customerDetail?.isVip}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    padding : scaleWidth(16)
  },

  containerItem: {
    transform: [{ translateY: -scaleWidth(375 / 3.5 / 2 - 15) }],
    flex : 1,
  },
  iconBell: {
    tintColor: colors.black,
    width: scaleHeight(18),
    height: scaleHeight(18),
  },

  buttonBell: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
