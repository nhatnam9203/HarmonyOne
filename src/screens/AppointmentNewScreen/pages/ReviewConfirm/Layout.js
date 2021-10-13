import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { Button, CustomerInfoView } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import { AppointmentServiceItem, AppointmentTimeView, TotalView, IconButton } from '@shared/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ButtonAddNote } from "./ButtonAddNote";
import NavigationService from '@navigation/NavigationService';
import moment from 'moment';


export const Layout = ({
  customerBooking,
  servicesBooking,
  extrasBooking,
  dayBooking,
  timeBooking,
  getTotalItem,
  getTotalPrice,
  getAllTotal,
  changeCustomer,
  deleteService,
  changeDateTime,
  addMore,
  confirm,
}) => {


  let dateTimeView = moment(`${dayBooking} ${timeBooking}`, ["YYYY-MM-DD hh:mm"])

  const renderHeader = () => (
    <View style={{ paddingRight: scaleWidth(16) }}>
      <CustomerInfoView
        customerId={customerBooking?.customerId}
        firstName={customerBooking?.firstName}
        lastName={customerBooking?.lastName}
        phoneNumber={customerBooking?.phone}
        onPress={changeCustomer}
      />
      <View style={styles.line} />
      <AppointmentTimeView
        fromTime={dateTimeView}
        icon={images.iconChangeDate}
        onPressIcon={changeDateTime}
      />
      <View style={styles.containerService}>
        <Text style={styles.titleService}>Services</Text>

      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={{ paddingRight: scaleWidth(16) }}>
      <IconButton
        icon={images.iconAddMore}
        iconStyle={styles.iconAddMore}
        style={styles.buttonAddMore}
        renderText={() => <Text style={styles.txtAddMore}>Add another service</Text>}
        onPress={addMore}
      />

      <View style={styles.containerTotal}>
        <TotalView
          duration={getAllTotal().duration}
          price={getAllTotal().price}
        />
      </View>

      <ButtonAddNote />

      <View style={{ height: scaleHeight(100) }} />
    </View>
  )

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={4}
        title={'Review & Confirm'}
        onPressBack={() => NavigationService.navigate(screenNames.SelectDateTime)}
      />
      <View style={styles.content}>
        <View style={{ flex: 1, paddingLeft: scaleWidth(16) }}>

          <SwipeListView
            showsVerticalScrollIndicator={false}
            data={servicesBooking}
            renderItem={(data, rowMap) => (
              <AppointmentServiceItem
                service={data.item}
                name={data.item?.name}
                duration={getTotalItem(data.item, "duration")}
                price={getTotalPrice(data.item)}
                isDelete={true}
                extras={extrasBooking.filter(ex => ex?.serviceId == data.item?.serviceId && ex.checked)}
                onPressItemReview={true}
              />
            )}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter()}
            keyExtractor={(item) => item?.serviceId + "serviceItemBooking"}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <View />
                <IconButton
                  icon={images.iconTrash}
                  iconStyle={styles.iconTrash}
                  style={styles.buttonDelete}
                  onPress={() => deleteService(data.item)}
                />
              </View>
            )}
            disableRightSwipe={true}
            leftOpenValue={0}
            rightOpenValue={-scaleWidth(60)}
          />

        </View>

        <View style={styles.bottom}>
          <Button
            label="Confirm"
            onPress={confirm}
            highlight={true}
            width={'100%'}
            disabled={servicesBooking.length == 0}
          />
        </View>
      </View>
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
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    marginTop: scaleHeight(5)
  },
  titleService: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    marginVertical: scaleHeight(16)
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
    marginTop: scaleHeight(16)
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
    height: scaleWidth(30)
  },
});