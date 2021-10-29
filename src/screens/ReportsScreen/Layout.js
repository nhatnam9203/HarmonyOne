import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { items } from "./Items";

export const Layout = ({
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Reports')}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <NotificationIcon />
        }
      >
        <View style={styles.content}>
          <ScrollView>
            <GroupItem icon={images.iconReportStaff} text="Staff" />
            <ItemSelect
              title={"Staff salary"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Service duration"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportGiftcard} text="Gift card" />
            <ItemSelect
              title={"Gift card sales"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />


            <GroupItem icon={images.iconReportCustomer} text="Customer" />
            <ItemSelect
              title={"Sales by customer"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportService} text="Service" />
            <ItemSelect
              title={"Sales by category"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Sales by service"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportProduct} text="Product" />
            <ItemSelect
              title={"Sales by category"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Sales by product"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportOverall} text="Overall" />
            <ItemSelect
              title={"Sales by payment method"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Marketing efficiency"}
              onPress={() => { }}
              style={{ paddingLeft: 0 }}
            />

            <View style={{ height: scaleHeight(100) }} />
          </ScrollView>


        </View>
      </SingleScreenLayout>
    </View>
  );
};

const GroupItem = ({ icon, text = "Staff" }) => {
  return (
    <View style={styles.itemGroup}>
      <Image
        source={icon}
        style={styles.iconReport}
        resizeMode='contain'
      />
      <Text style={styles.txtGroup}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  itemGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleWidth(16),
    marginTop: scaleHeight(16)
  },

  iconReport: {
    width: scaleHeight(27),
    height: scaleHeight(27),
  },

  txtGroup: {
    fontSize: scaleFont(18),
    color: colors.ocean_blue,
    fontFamily: fonts.BOLD,
    marginLeft: scaleWidth(12)
  },

  content: {
    flex: 1,
  },

  iconBell: {
    tintColor: "#7B99BA",
    width: scaleHeight(20),
    height: scaleHeight(20),
  },

  buttonBell: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
