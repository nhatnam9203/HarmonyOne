import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView  } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomerInfo, CustomerSales, CustomerAppointmentNumber, CustomerAppointments } from "./widget";
import { WithPopupActionSheet } from "@shared/HOC";
import { DialogConfirm } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

let EditButton = ({ ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Image
        source={images.iconMore}
        style={styles.treedot}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

EditButton = WithPopupActionSheet(EditButton);

export const Layout = ({
  customerDetail,
  getActionSheets,
  dialogDeleteCustomer,
  submitDeleteCustomer,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Customer details')}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        onPressLeft={() => NavigationService.navigate(screenNames.CustomersScreen)}
        headerRightComponent={() =>
          <EditButton actions={getActionSheets()} />
        }
      >
        <ScrollView bounces={false} style={styles.content}>
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
          <CustomerSales
            totalSales={customerDetail?.customerHistory?.totalSales || ""}
            lastVisitSale={customerDetail?.customerHistory?.lastVisitSale || ""}
            lastVisitDate={customerDetail?.customerHistory?.lastVisitDate || ""}
          />
          <CustomerAppointmentNumber
            allBooking={customerDetail?.customerHistory?.allBooking || "0"}
            completed={customerDetail?.customerHistory?.completed || "0"}
            cancelled={customerDetail?.customerHistory?.cancelled || "0"}
            upcomming={customerDetail?.customerHistory?.upcomming || "0"}
          />
          <CustomerAppointments
            upcomings={customerDetail?.customerHistory?.upcomings || []}
          />
          <DialogConfirm
            ref={dialogDeleteCustomer}
            title={t('Delete customer')}
            titleContent={t("Are you sure you want to delete this customer?")}
            onConfirmYes={() => submitDeleteCustomer()}
            onModalHide={() => { }}
          />

          <View style={{ height: scaleHeight(100) }} />
        </ScrollView>
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
    padding: scaleWidth(16)
  },
  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  }
});

