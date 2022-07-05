import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect, NotificationIcon } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";

export const Layout = ({
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('txtReports')}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <NotificationIcon />
        }
      >
        <View style={styles.content}>
          <ScrollView>
            <GroupItem icon={images.iconReportStaff} text={translate("txtStaff")}/>
            <ItemSelect
              title={translate("Staff salary")}
              onPress={() => {
                NavigationService.navigate(screenNames.ReportStaffSalary);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={translate("Service duration")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceDuration);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportGiftcard} text={translate("Gift card")} />
            <ItemSelect
              title={translate("Gift card sales")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportGiftCardSales);
              }}
              style={{ paddingLeft: 0 }}
            />


            <GroupItem icon={images.iconReportCustomer} text={translate("Customer")} />
            <ItemSelect
              title={translate("Sales by customer")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportCustomerSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportService} text="Service" />
            <ItemSelect
              title={translate("Sales by category")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceCategorySales);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={translate("Sales by service")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportServiceSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportProduct} text={translate("txtProducts")} />
            <ItemSelect
              title={translate("Sales by category")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportProductCategorySales);
               }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={translate("Sales by product")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportProductSales);
              }}
              style={{ paddingLeft: 0 }}
            />

            <GroupItem icon={images.iconReportOverall} text={translate("Overall")} />
            <ItemSelect
              title={translate("Sales by payment method")}
              onPress={() => { 
                NavigationService.navigate(screenNames.ReportOverallPaymentMethod);
              }}
              style={{ paddingLeft: 0 }}
            />
            <ItemSelect
              title={translate("Marketing efficiency")}
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
        resizeMode='cover'
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
    width: scaleHeight(22),
    height: scaleHeight(22),
  },

  txtGroup: {
    fontSize: scaleFont(17),
    color: colors.ocean_blue,
    fontFamily: fonts.BOLD,
    marginLeft: scaleWidth(10)
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
