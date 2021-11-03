import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import NavigationService from '@navigation/NavigationService';

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
              onPress={() => {
                NavigationService.navigate(screenNames.ReportStaffSalary);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Service duration"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceDuration);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportGiftcard} text="Gift card" />
            <ItemSelect
              title={"Gift card sales"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportGiftCardSales);
              }}
              style={{ paddingLeft: 0 }}
            />


            <GroupItem icon={images.iconReportCustomer} text="Customer" />
            <ItemSelect
              title={"Sales by customer"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportCustomerSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportService} text="Service" />
            <ItemSelect
              title={"Sales by category"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceCategorySales);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Sales by service"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportProduct} text="Product" />
            <ItemSelect
              title={"Sales by category"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportProductCategorySales);
               }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Sales by product"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportProductSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportOverall} text="Overall" />
            <ItemSelect
              title={"Sales by payment method"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportOverallPaymentMethod);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={"Marketing efficiency"}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportOverallMarketingEfficiency);
              }}
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
