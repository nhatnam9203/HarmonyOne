import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton } from "@shared/components";
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
              <ItemReport
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


const ItemReport = ({ title = '', icon }) => (
  <TouchableOpacity activeOpacity={1} style={styles.item}>
    <IconButton
      icon={icon}
      iconStyle={styles.iconReport}
      onPress={() => { }}
      renderText={() => <Text style={styles.text}>{title}</Text>}
    />
    <Image
      source={images.iconArrow}
      style={styles.arrow}
    />
  </TouchableOpacity>
)

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

  item: {
    width: '100%',
    padding: scaleWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd"
  },

  iconReport: {
    width: scaleHeight(24),
    height: scaleHeight(24),
  },

  text: {
    fontSize: scaleFont(16),
    fontFamily: fonts.MEDIUM,
    marginLeft: scaleWidth(16),
    color: colors.greyish_brown_40,
  },

  arrow: {
    width: scaleWidth(6),
    height: scaleHeight(10),
  },
});
