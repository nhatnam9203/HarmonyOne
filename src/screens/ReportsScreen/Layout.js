import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";

const itemsReport = [
  {
    title: "Sales",
    icon: images.iconSales,
    onPress: () => { }
  },
  {
    title: "Customer",
    icon: images.iconTabCustomer,
    onPress: () => { }
  },
  {
    title: "Services",
    icon: images.iconService,
    onPress: () => { }
  },
  {
    title: "Payment method",
    icon: images.iconPayment,
    onPress: () => { }
  },
  {
    title: "Marketing",
    icon: images.iconMarketing,
    onPress: () => { }
  }
]

export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Reports')}
        isLeft={false}
        isScrollLayout={false}
        imageBackground={images.imageHeaderBg}
        containerStyle={{ paddingVertical: 0 }}
        headerTintColor="white"
        headerRightComponent={() =>
          <IconButton
            icon={images.iconBell}
            iconStyle={styles.iconBell}
            style={styles.buttonBell}
            onPress={() => { }}
          />
        }
      >
        <View style={styles.content}>
          {
            itemsReport.map((item) => (
              <ItemSelect
                key={item.title}
                title={item.title}
                icon={item.icon}
                onPress={item.onPress}
              />
            ))
          }
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
  },

  iconBell: {
    tintColor: colors.white,
    width: scaleHeight(24),
    height: scaleHeight(24),
  },

  buttonBell: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
