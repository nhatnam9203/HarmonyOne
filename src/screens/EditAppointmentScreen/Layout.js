import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { Button, CustomerInfoView, DayPicker } from "@shared/components";
import {
  AppointmentServiceItem,
  AppointmentTimeView,
  TotalView,
  IconButton,
  InputSelectTime,
} from '@shared/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SingleScreenLayout } from '@shared/layouts';
import { dateToFormat } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import moment from 'moment';


export const Layout = ({
  getTotalItem,
  getTotalPrice,
  getAllTotal,
  deleteService,
  changeDateTime,
  confirm,
  dialogBookingRef,
  onOK,
  isQuickCheckout,
  onPressBack,
  appointmentDetail,
  appointmentEdit,
  addMoreService
}) => {

  const renderHeader = () => (
    <View style={{ paddingRight: scaleWidth(16), paddingTop : 8 }}>
      <CustomerInfoView
        customerId={appointmentEdit?.customerId}
        firstName={appointmentEdit?.firstName}
        lastName={appointmentEdit?.lastName}
        phoneNumber={appointmentEdit?.phoneNumber}
        onPress={() => { }}
        isButtonRight={false}
      />
      <View style={styles.line} />
      {
        <>
          <DayPicker
            onApply={() => { }}
            componentRender={() => (
              <AppointmentTimeView
                fromTime={appointmentEdit.fromTime}
                onPressIcon={() => { }}
              />
            )}
          />
          <View style={[styles.line, { marginTop: scaleHeight(8) }]} />
        </>
      }
      <View style={styles.containerService}>
        <Text style={styles.titleService}>
           Services
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
        renderText={() => <Text style={styles.txtAddMore}>Add another service</Text>}
        onPress={addMoreService}
      />

      <View style={styles.containerTotal}>
        <TotalView
          duration={getAllTotal().duration}
          price={`$ ${getAllTotal().price}`}
        />
      </View>

      <View style={{ height: scaleHeight(100) }} />
    </View>
  )

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={"Edit Appointment"}
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
        containerStyle={{ paddingVertical: 0 }}
      >
        <View style={styles.content}>
          <View style={{ flex: 1, paddingLeft: scaleWidth(16) }}>
            <SwipeListView
              showsVerticalScrollIndicator={false}
              data={appointmentEdit?.services}
              renderItem={(data, rowMap) => (
                <View>
                  <AppointmentServiceItem
                    service={data.item}
                    name={data.item?.serviceName}
                    duration={getTotalItem(data.item, "duration")}
                    price={getTotalPrice(data.item)}
                    isDelete={true}
                    extras={appointmentEdit?.extras.filter(ex => ex?.serviceId == data.item?.serviceId && ex.checked)}
                    onPressItemReview={true}
                  />
                  <View style={styles.rowItemTime}>
                    <Text style={styles.titleStartTime}>Start time</Text>
                    <InputSelectTime
                      apply={time => { }}
                      time={dateToFormat(data?.item?.fromTime, "hh:mm A")}
                      renderInput={() => (
                        <View style={styles.inputSelectTime}>
                          <Text style={styles.serviceFromtime}>
                            {dateToFormat(data?.item?.fromTime, "hh:mm A")}
                          </Text>
                          <Image
                            source={images.downarrow}
                            style={styles.iconArrowDown}
                            resizeMode='contain'
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
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
              label={"Confirm"}
              onPress={confirm}
              highlight={true}
              width={'100%'}
            />
          </View>
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    width: scaleWidth(37),
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  iconClose: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "#404040"
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: "white"
  },
  content: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  buttonDelete: {
    width: scaleWidth(60),
    height: scaleHeight(90),
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

  rowItemTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8)
  },
  titleStartTime: {
    fontSize: scaleFont(15),
    color: "#7A98BB",
    fontFamily: fonts.REGULAR
  },
  iconArrowDown: {
    width: scaleWidth(10),
    height: scaleWidth(10),
    marginLeft: 5,
    tintColor: "#404040"
  },

  serviceFromtime: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontFamily: fonts.MEDIUM
  },
  inputSelectTime: {
    flexDirection: "row",
    marginLeft: scaleWidth(50),
    alignItems: "center"
  }
});
