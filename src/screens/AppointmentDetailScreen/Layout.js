import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { useTranslation } from 'react-i18next';
import { CustomerInfoView } from './CustomerInfoView';
import { AppointmentTimeView } from './AppointmentTimeView';
import { CustomerAtHomeView } from './CustomerAtHomeView';
import { AppointmentServiceList } from './AppointmentServiceList';
import { formatMoneyWithUnit } from '@shared/utils';
import { Button } from "@shared/components";
import { colors, fonts, layouts, images } from '@shared/themes';
import { WithPopupActionSheet } from '@shared/HOC';

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
      text = "Check-In";
      break;

    case "checkin":
      text = "Check-Out";
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
}) => {
  const [t] = useTranslation();

  const getDuration = (duration) => {
    return duration + ' min';
  };

  const getPrice = (price) => {
    return formatMoneyWithUnit(price);
  };

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Appointment details')}
        {...headerColor}
        isRight={canEdit}
        isScrollLayout={false}
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
          <AppointmentServiceList services={appointmentItem?.services} />

          <View style={styles.totalContent}>
            <View style={styles.totalInfoContent}>
              <Text style={styles.textTotalInfo}>
                {t('Total duration')}
              </Text>
              <Text style={styles.textTotalInfo}>
                {getDuration(appointmentItem?.duration)}
              </Text>
            </View>
            <View style={styles.totalInfoContent}>
              <Text style={styles.textTotal}>
                {t('Total')}
              </Text>
              <Text style={styles.textTotalPrice}>
                {getPrice(appointmentItem?.total)}
              </Text>
            </View>
          </View>
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

  totalInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: scaleHeight(30),
  },

  textTotalInfo: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'left',
    color: colors.bluegrey,
  },

  textTotal: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.bluegrey,
  },

  textTotalPrice: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(15),
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.frog_green,
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
    padding: scaleWidth(16),
    width: scaleWidth(375),
  }

});
