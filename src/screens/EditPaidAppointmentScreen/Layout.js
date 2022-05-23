import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';
import { formatMoneyWithUnit, convertMinsToHrsMins } from '@shared/utils';
import { Button } from "@shared/components";
import { colors, fonts, layouts, images } from '@shared/themes';
import { WithPopupActionSheet } from '@shared/HOC';
import { TotalView, TotalViewPaid, AppointmentTimeView, CustomerInfoView, InputSelectStaff, IconButton } from "@shared/components";
import { AppointmentServiceList } from './AppointmentServiceList';
import { InvoiceNumber } from "./InvoiceNumber";
import moment from "moment";
import NavigationService from '@navigation/NavigationService';

let EditButton = ({ headerTintColor, ...props }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Image
        source={images.iconMore}
        style={[styles.iconSize, { tintColor: headerTintColor }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

EditButton = WithPopupActionSheet(EditButton);

export const Layout = ({
  appointmentItem,
  headerColor,
  updatePaidAppointment,
  invoiceViewAppointmentDetail,
  getBarStyle,
  getInvoiceDetail,
  roleName,
  staffsByDate,
  assignOtherStaff,
}) => {
  const [t] = useTranslation();

  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={`${t('Edit Appointment')} #${appointmentItem?.code?.toString().substring(appointmentItem?.code?.length - 4)}`}
        {...headerColor}
        isLeft={false}
        isRight={true}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconClose}
            iconStyle={styles.iconClose}
            style={styles.buttonClose}
            onPress={() => NavigationService.back()}
          />
        }
        isScrollLayout={false}
        >
        <ScrollView style={styles.content}>
          <CustomerInfoView
            customerId={appointmentItem?.customerId}
            firstName={appointmentItem?.firstName}
            lastName={appointmentItem?.lastName}
            phoneNumber={appointmentItem?.phoneNumber}
            isShowPhone={(roleName == "admin" || roleName == "manager")}
          />
          <View style={styles.line} />
          <AppointmentTimeView
            fromTime={appointmentItem?.fromTime}
            toTime={appointmentItem?.toTime}
          />
          <View style={styles.line} />
          <AppointmentServiceList
            services={appointmentItem?.services}
            extras={appointmentItem?.extras}
            products={appointmentItem?.products}
            giftCards={appointmentItem?.giftCards}
            appointmentItem={appointmentItem}
          />

          {
            (appointmentItem?.status == "paid" 
            || appointmentItem?.status == "refund" 
            || appointmentItem?.status == "void" 
            || appointmentItem?.status == "no show") ?
              <TotalViewPaid
                duration={`${convertMinsToHrsMins(appointmentItem?.duration)}`}
                price={`$ ${appointmentItem?.total}`}
                subTotal={`$ ${appointmentItem?.subTotal}`}
                discount={`$ ${appointmentItem?.discount}`}
                tipAmount={`$ ${appointmentItem?.tipAmount}`}
                tax={`$ ${appointmentItem?.tax}`}
                giftCard={`$ ${appointmentItem?.giftCard}`}
              /> :
              <TotalView
                duration={`${convertMinsToHrsMins(appointmentItem?.duration)}`}
                price={`$ ${appointmentItem?.total}`}
                subTotal={`$ ${appointmentItem?.subTotal}`}
                isShowSubtotal={true}
              />
          }


          <InvoiceNumber
            invoiceViewAppointmentDetail={invoiceViewAppointmentDetail}
            appointmentItem={appointmentItem}
            getInvoiceDetail={getInvoiceDetail}
          />
        </ScrollView>

        {
          <View style={styles.bottom}>
            <Button
              label={"Save"}
              onPress={updatePaidAppointment}
              highlight={true}
              width={'100%'}
            />
          </View>
        }
     
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonArrow: {
    width: "100%",
    height: scaleHeight(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: colors.ocean_blue,
    marginTop: scaleHeight(8)
  },
  iconClose: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "#ffffff"
  },
  buttonClose: {
    width: scaleWidth(37),
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  invoiceNumber: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.REGULAR,
    marginBottom: scaleHeight(8)
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingHorizontal: scaleWidth(16),
    flex: 1,
  },

  line: {
    height: scaleHeight(1),
    width: '100%',
    backgroundColor: '#eeeeee',
    alignSelf: 'center',
  },

  totalContent: {
    flex: 0,
  },

  iconSize: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottom: {
    paddingHorizontal: scaleWidth(16),
    width: scaleWidth(375),
  },

  txtAppointmentAnyStaff: {
    color: colors.red,
    fontSize: scaleFont(14),
    fontFamily: fonts.REGULAR,
    textAlign: "center",
    marginHorizontal: scaleWidth(20),
  }

});