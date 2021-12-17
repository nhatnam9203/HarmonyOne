import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { Button, CustomerInfoView } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import {
  AppointmentServiceItem,
  AppointmentProductItem,
  AppointmentTimeView,
  AppointmentGiftCardItem,
  TotalView,
  IconButton,
  DialogSuccess
}
  from '@shared/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ButtonAddNote } from "./ButtonAddNote";
import { guid } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import moment from 'moment';


export const Layout = ({
  customerBooking,
  servicesBooking,
  productsBooking,
  extrasBooking,
  giftCardsBooking,
  dayBooking,
  timeBooking,
  getTotalItem,
  getTotalPrice,
  getAllTotal,
  changeCustomer,
  deleteService,
  deleteProduct,
  deleteGiftCard,
  changeDateTime,
  addMore,
  confirm,
  dialogBookingRef,
  onOK,
  isQuickCheckout,
  onPressBack,
  isDisabledConfirm,
}) => {


  let dateTimeView = timeBooking ? moment(`${dayBooking} ${timeBooking}`, ["YYYY-MM-DD hh:mm"]) : moment();

  const dataList = [...servicesBooking, ...productsBooking, ...giftCardsBooking];



  const renderHeader = () => (
    <View style={{ paddingRight: scaleWidth(16) }}>
      <CustomerInfoView
        customerId={customerBooking?.customerId}
        firstName={customerBooking?.firstName}
        lastName={customerBooking?.lastName}
        phoneNumber={customerBooking?.phone}
        onPress={changeCustomer}
        isShowPhone={true}
      />
      <View style={styles.line} />
      {
        !isQuickCheckout &&
        <>
          <AppointmentTimeView
            fromTime={dateTimeView}
            icon={images.iconChangeDate}
            onPressIcon={changeDateTime}
          />
          <View style={[styles.line, { marginTop: scaleHeight(8) }]} />
        </>
      }
      <View style={styles.containerService}>
        <Text style={styles.titleService}>
          {
            isQuickCheckout ? "Items" : "Services"
          }
        </Text>
      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={{ paddingRight: scaleWidth(16) }}>
      <IconButton
        icon={images.iconAddMore}
        iconStyle={styles.iconAddMore}
        style={styles.buttonAddMore}
        renderText={() => <Text style={styles.txtAddMore}>Add more</Text>}
        onPress={addMore}
      />

      <View style={styles.containerTotal}>
        <TotalView
          duration={getAllTotal().duration}
          price={`$ ${getAllTotal().price}`}
          isShowSubtotal={true}
          subTotal={`$ ${getAllTotal().price}`}
        />
      </View>

      <ButtonAddNote />

      <View style={{ height: scaleHeight(100) }} />
    </View>
  );

  const step = isQuickCheckout ? "3" : "4";

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={step}
        title={'Review & Confirm'}
        onPressBack={onPressBack}
      />
      <View style={styles.content}>
        <View style={{ flex: 1, paddingLeft: scaleWidth(16) }}>

          <SwipeListView
            showsVerticalScrollIndicator={false}
            data={dataList}
            renderItem={(data, rowMap) => data?.item?.serviceId ? (
              <AppointmentServiceItem
                service={data.item}
                name={data.item?.name}
                duration={getTotalItem(data.item, "duration")}
                price={getTotalPrice(data.item)}
                isDelete={true}
                extras={extrasBooking.filter(ex => ex?.serviceId == data.item?.serviceId && ex.checked)}
                onPressItemReview={true}
              />
            ) :
              data?.item?.giftCardId ?
                <AppointmentGiftCardItem
                  giftCard={data.item}
                  name={data.item?.name}
                  price={data?.item?.price}
                  isDelete={true}
                />
                : <AppointmentProductItem
                  product={data.item}
                  name={data.item?.name}
                  duration={getTotalItem(data.item, "duration")}
                  price={getTotalPrice(data.item)}
                  isDelete={true}
                  onPressItemReview={true}
                />
            }
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter()}
            keyExtractor={(item) => item?.serviceId ? item?.serviceId + guid() : item?.productId + guid() + "itemBooking"}
            renderHiddenItem={(data, rowMap) => {
              return (
                <View style={styles.rowBack}>
                  <View />
                  <IconButton
                    icon={images.iconTrash}
                    iconStyle={styles.iconTrash}
                    style={styles.buttonDelete}
                    onPress={() => data?.item?.serviceId ? deleteService(data.item) : data?.item?.giftCardId ? deleteGiftCard(data.item) : deleteProduct(data.item)}
                  />
                </View>
              )
            }}
            disableRightSwipe={true}
            leftOpenValue={0}
            rightOpenValue={-scaleWidth(60)}
          />

        </View>

        <View style={styles.bottom}>
          <Button
            label={isQuickCheckout ? "Check Out" : "Confirm"}
            onPress={confirm}
            highlight={true}
            width={'100%'}
            isTurnOff={isDisabledConfirm}
            disabled={(servicesBooking.length + productsBooking.length + giftCardsBooking.length) == 0}
          />
        </View>
      </View>
      <DialogSuccess
        ref={dialogBookingRef}
        onConfirmYes={() => onOK()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: "#eeeeee",
    marginBottom: scaleHeight(5)
  },
  containerService: {
  },
  titleService: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(17),
    marginBottom: scaleHeight(16),
    marginTop: scaleHeight(10),
    color: "#404040"
  },
  txtAddMore: {
    fontSize: scaleFont(17),
    color: colors.ocean_blue,
    marginLeft: scaleWidth(16)
  },
  iconAddMore: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  buttonAddMore: {
    marginTop: scaleHeight(16)
  },
  containerTotal: {
    marginTop: scaleHeight(26)
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  buttonDelete: {
    width: scaleWidth(60),
    height: "100%",
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDelete: {
    color: "white",
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(16)
  },
  iconTrash: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "white"
  },
});
