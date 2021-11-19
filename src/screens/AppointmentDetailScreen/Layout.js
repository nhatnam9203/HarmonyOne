import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';
import { formatMoneyWithUnit, convertMinsToHrsMins } from '@shared/utils';
import { Button } from "@shared/components";
import { colors, fonts, layouts, images } from '@shared/themes';
import { WithPopupActionSheet } from '@shared/HOC';
import { TotalView, AppointmentTimeView, CustomerInfoView } from "@shared/components";
import { CustomerAtHomeView } from './CustomerAtHomeView';
import { AppointmentServiceList } from './AppointmentServiceList';
import { InvoiceNumber } from "./InvoiceNumber";
import moment from "moment";

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

const titleNextStatus = (status) => {
  let text = "Confirm"
  switch (status) {
    case "unconfirm":
      text = "Confirm"
      break;

    case "confirm":
      text = "Check-in";
      break;

    case "checkin":
      text = "Check-out";
      break

    default:
      break;
  }
  return text;

}

export const Layout = ({
  appointmentItem,
  headerColor,
  canEdit,
  getActionSheets,
  updateNextStatus,
  invoiceViewAppointmentDetail,
  getBarStyle,
}) => {
  const [t] = useTranslation();

  console.log({ appointmentItem })


  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={`${t('Appointment')} #${appointmentItem?.code?.toString().substring(appointmentItem?.code?.length - 4)}`}
        {...headerColor}
        isRight={canEdit}
        isScrollLayout={false}
        barStyle={getBarStyle()}
        headerRightComponent={() =>
          canEdit && (
            <EditButton
              headerTintColor={headerColor?.headerTintColor}
              actions={getActionSheets()}
            />
          )
        }>
        <ScrollView style={styles.content}>
          <CustomerInfoView
            customerId={appointmentItem?.customerId}
            firstName={appointmentItem?.firstName}
            lastName={appointmentItem?.lastName}
            phoneNumber={appointmentItem?.phoneNumber}
          />
          {/* <CustomerAtHomeView /> */}
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
          />

          <TotalView
            duration={`${convertMinsToHrsMins(appointmentItem?.duration)}`}
            price={`$ ${appointmentItem?.total}`}
          />

          <InvoiceNumber
            invoiceViewAppointmentDetail={invoiceViewAppointmentDetail}
            appointmentItem={appointmentItem}
          />
        </ScrollView>

        {
          canEdit &&
          <View style={styles.bottom}>
            <Button
              label={titleNextStatus(appointmentItem?.status)}
              onPress={updateNextStatus}
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
  }

});
