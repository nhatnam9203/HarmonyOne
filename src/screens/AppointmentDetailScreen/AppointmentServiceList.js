import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { colors, fonts, layouts } from '@shared/themes';
import { AppointmentServiceItem, 
          AppointmentProductItem, 
          AppointmentGiftCardItem 
        } from '@shared/components';
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import { useSelector, useDispatch } from "react-redux";
import { translate } from "@localize";

export const AppointmentServiceList = ({ services = [], 
                                          extras = [], 
                                          products = [], 
                                          giftCards , 
                                        }) => {

  const totalDuration = (service, itemType) => {
    let total = 0;
    total += parseInt(service[itemType])
    for (let i = 0; i < extras.length; i++) {
      if ((extras[i].bookingServiceId == service.bookingServiceId)) {
        total += extras[i][itemType];
      }
    }
    return total;
  }

  const getTotalPrice = (service) => {
    let total = 0;
    total += formatNumberFromCurrency(service.price);
    for (let i = 0; i < extras.length; i++) {
      if ((extras[i].bookingServiceId == service.bookingServiceId)) {
        total += formatNumberFromCurrency(extras[i].price);
      }
    }
    return formatMoney(total);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{translate('Items')}</Text>
      {
        services?.map((item) => (
          <AppointmentServiceItem
            key={item?.bookingServiceId + "serviceItem"}
            service={item}
            extras={extras.filter(ex => ex.bookingServiceId == item?.bookingServiceId).map(ex => ({ ...ex, name: ex.extraName }))}
            name={item?.serviceName}
            duration={totalDuration(item, "duration")}
            price={getTotalPrice(item)}
          />
        ))
      }
      {
        products?.map((item) => (
          <AppointmentProductItem
            key={item?.bookingProductId + "productItem"}
            product={item}
            name={item?.productName}
            price={item?.price}
          />
        ))
      }
      {
        giftCards?.map((item) => (
          <AppointmentGiftCardItem
            key={item?.bookingGiftCardId + "giftCardItem"}
            giftCard={item}
            name={item?.name}
            price={item?.price}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: scaleHeight(10) },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(17),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: colors.greyish_brown_40,
  },
});
