import { colors, fonts, images, layouts } from '@shared/themes';
import { formatPhoneNumber } from '@shared/utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CustomerInfoView = ({
  customerId,
  firstName = '',
  lastName,
  phoneNumber,
}) => {
  const [customer, setCustomer] = React.useState(null);

  const getFirstCharName = React.useCallback(() => {
    if (customer) {
      return customer.firstName?.charAt(0)?.toUpperCase();
    } else {
      return firstName?.charAt(0)?.toUpperCase();
    }
  }, [customer, firstName]);

  const getCustomerFullName = React.useCallback(() => {
    if (customer) {
      return `${customer.firstName} ${customer.lastName}`;
    } else {
      return `${firstName} ${lastName}`;
    }
  }, [customer, firstName, lastName]);

  const getPhoneNumber = React.useCallback(() => {
    if (customer) {
      return `${formatPhoneNumber(customer.phone)}`;
    } else {
      return `${formatPhoneNumber(phoneNumber)}`;
    }
  }, [customer, phoneNumber]);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getFirstCharName()}</Text>
      </View>
      <View style={layouts.marginHorizontal} />
      <View style={styles.customerContent}>
        <Text style={styles.textName}>{getCustomerFullName()}</Text>
        <Text style={styles.textPhone}>{getPhoneNumber()}</Text>
      </View>
      <Image source={images.iconArrow} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(80),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: scaleWidth(48),
    height: scaleHeight(48),
    borderRadius: scaleWidth(24),
    backgroundColor: colors.white_fa,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(23),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.55,
    textAlign: 'center',
    color: colors.ocean_blue,
  },

  customerContent: { flex: 1 },

  textName: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(20),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.48,
    textAlign: 'left',
    color: colors.greyish_brown_40,
    height: scaleHeight(30),
  },

  textPhone: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'left',
    color: colors.bluegrey,
    height: scaleHeight(20),
  },

  arrow: {
    width: scaleWidth(6),
    height: scaleHeight(10),
  },
});
