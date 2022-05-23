import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, fonts, layouts, images } from '@shared/themes';
import { AppointmentServiceItem, 
          AppointmentProductItem, 
          AppointmentGiftCardItem,
          InputSelectStaff,
        } from '@shared/components';
import { formatNumberFromCurrency, formatMoney, convertMinsToHrsMins } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import { useSelector, useDispatch } from "react-redux";
import { bookAppointment, appointment, editAppointment, service, app } from "@redux/slices";

export const AppointmentServiceList = ({ services = [], 
                                          extras = [], 
                                          products = [], 
                                          giftCards , 
                                          appointmentItem,

                                        }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
 
  const {
    editAppointment: { appointmentEdit },
    staff: { staffListByMerchant = [] },
  } = useSelector(state => state);

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
    for (let i = 0; i < appointmentEdit.extras.length; i++) {
      if ((appointmentEdit.extras[i].bookingServiceId == service.bookingServiceId)) {
        total += formatNumberFromCurrency(appointmentEdit.extras[i].price);
      }
    }
    return formatMoney(total);
  }

  const editService = (item) => {
    console.log("editService", item)
    const extrasEdit = appointmentEdit?.extras
      .filter(
        ex => ex?.bookingServiceId ? ex?.bookingServiceId == item?.bookingServiceId :
          ex?.serviceId == item?.serviceId
      )
      .map(ex => ({ ...ex, name: ex?.extraName ?? ex?.name }))
      console.log(appointmentEdit?.extras)
    console.log('extrasEdit', extrasEdit)
    NavigationService.navigate(
      screenNames.EditPaidServicePage,
      {
        item,
        extrasEdit
      });
    
  }

  const getStaffService = (staffId = 0) => {
    if (staffId == 0) {
      return "Any staff";
    } else {
      return staffListByMerchant.find(staff => staff?.staffId == staffId)?.displayName || "";
    }
  }

  const changeStaffService = (staffId, serviceId) => {
    dispatch(editAppointment.changeStaffService({ staffId, serviceId }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{t('Items')}</Text>
      {
        services?.map((item) => (
          <View>
          <AppointmentServiceItem
            key={item?.bookingServiceId + "serviceItem"}
            service={item}
            extras={extras.filter(ex => ex.bookingServiceId == item?.bookingServiceId).map(ex => ({ ...ex, name: ex.extraName }))}
            name={item?.serviceName}
            duration={totalDuration(item, "duration")}
            price={getTotalPrice(item)}
            onPressItem={() => editService(item)}
            isShowStaff={false}
            isShowTip={true}
          />
          
            {/****************** STAFF OFF SERVICE ******************/}
            <View style={[styles.rowItem, { marginRight: scaleWidth(16) }]}>
              {
                  <>
                    <Text style={styles.titleStaff}>
                      {getStaffService(item?.staffId) ? "Staff" : ""}
                    </Text>
                    <InputSelectStaff
                      items={staffListByMerchant.filter(staff => staff?.isDisabled == 0)}
                      itemSelected={item?.staffId == 0 ? 3 : item?.staffId}
                      serviceId={item?.serviceId}
                      onSelect={(staffId) => changeStaffService(staffId, item?.serviceId)}
                      isAnyStaff={item?.staffId == 0}
                      renderInput={() => (
                        <View style={styles.inputSelectTime}>
                          <Text style={styles.serviceFromtime}>
                            {getStaffService(item?.staffId) || "Waiting List"}
                          </Text>
                          <Image
                            source={images.downarrow}
                            style={styles.iconArrowDown}
                            resizeMode='contain'
                          />
                        </View>
                      )}
                    />
                  </>
              }
            </View>
          </View>
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
  inputSelectTime: {
    flexDirection: "row",
    marginLeft: scaleWidth(16),
    alignItems: "center"
  },
  serviceFromtime: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.MEDIUM
  },
  iconArrowDown: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    marginLeft: 5,
    tintColor: "#404040"
  },
  titleStaff: {
    fontSize: scaleFont(15),
    color: "#7A98BB",
    fontFamily: fonts.REGULAR
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8)
  },
});
