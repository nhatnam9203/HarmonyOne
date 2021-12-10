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
  AppointmentProductItem,
  AppointmentGiftCardItem
} from '@shared/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SingleScreenLayout } from '@shared/layouts';
import { dateToFormat, slop } from "@shared/utils";
import { InputSelectStaff } from "./InputSelectStaff";
import NavigationService from '@navigation/NavigationService';
import DropdownAlert from 'react-native-dropdownalert';
import moment from 'moment';


export const Layout = ({
  getTotalItem,
  getTotalPrice,
  getAllTotal,
  deleteService,
  changeDateTime,
  changeServiceTime,
  changeStaffService,
  confirm,
  onPressBack,
  appointmentDetail,
  appointmentEdit,
  addMoreService,
  editService,
  alertRef,
  deleteProduct,
  deleteGiftCard,
  roleName,
  staffListByMerchant
}) => {


  const getStaffService = (staffId = 0) => {
    if (staffId == 0) {
      return "Any staff";
    } else {
      return staffListByMerchant.find(staff => staff?.staffId == staffId)?.displayName || "";
    }
  }


  const renderHeader = () => (
    <View style={{ paddingRight: scaleWidth(16), paddingTop: 8 }}>
      <CustomerInfoView
        customerId={appointmentEdit?.customerId}
        firstName={appointmentEdit?.firstName}
        lastName={appointmentEdit?.lastName}
        phoneNumber={appointmentEdit?.phoneNumber}
        onPress={() => { }}
        isButtonRight={false}
        isShowPhone={(roleName == "admin" || roleName == "manager")}
      />
      <View style={styles.line} />
      {
        <>
          <DayPicker
            onApply={changeDateTime}
            dayPicked={moment(appointmentEdit.fromTime)}
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
          Items
        </Text>
      </View>
    </View>
  )

  const renderFooter = () => (
    <View style={{ paddingRight: scaleWidth(16), marginTop: scaleHeight(12) }}>
      <IconButton
        icon={images.iconAddMore}
        iconStyle={styles.iconAddMore}
        style={styles.buttonAddMore}
        renderText={() => <Text style={styles.txtAddMore}>Add another service</Text>}
        onPress={addMoreService}
        slop={slop(0)}
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

  const dataList = [...appointmentEdit?.services, ...appointmentEdit?.products, ...appointmentEdit?.giftCards];


  return (
    <>
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
                data={dataList}
                renderItem={(data, rowMap) => data?.item?.productId ?
                  <AppointmentProductItem
                    product={data?.item}
                    name={data?.item?.productName}
                    price={data?.item?.price}
                    isDelete={true}
                  />
                  : data?.item?.giftCardId ?
                    <AppointmentGiftCardItem
                      giftCard={data?.item}
                      name={data?.item?.name}
                      price={data?.item?.price}
                      isDelete={true}
                    /> :
                    (
                      <View>
                        <AppointmentServiceItem
                          service={data.item}
                          name={data.item?.serviceName ?? data.item?.name}
                          duration={getTotalItem(data.item, "duration")}
                          price={getTotalPrice(data.item)}
                          isDelete={true}
                          isShowStaff={false}
                          extras={
                            appointmentEdit?.extras
                              .filter(
                                ex => ex?.bookingServiceId ? ex?.bookingServiceId == data.item?.bookingServiceId :
                                  ex?.serviceId == data.item?.serviceId
                              )
                              .map(ex => ({ ...ex, name: ex?.extraName ?? ex?.name }))
                          }
                          onPressItemReview={true}
                          onPressItem={() => editService(data.item)}
                        />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                          {/****************** START TIME ******************/}
                          <View style={styles.rowItemTime}>
                            <Text style={styles.titleStartTime}>Start time</Text>
                            <InputSelectTime
                              apply={(time) => changeServiceTime(time, data?.item?.bookingServiceId)}
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

                          {/****************** STAFF OFF SERVICE ******************/}
                          <View style={[styles.rowItemTime, { marginRight: scaleWidth(16) }]}>
                            <Text style={styles.titleStartTime}>Staff</Text>
                            <InputSelectStaff
                              items={staffListByMerchant.filter(staff => staff?.isDisabled == 0)}
                              itemSelected={data?.item?.staffId}
                              onSelect={(staffId) => changeStaffService(staffId, data?.item?.serviceId)}
                              renderInput={() => (
                                <View style={styles.inputSelectTime}>
                                  <Text style={styles.serviceFromtime}>
                                    {getStaffService(data?.item?.staffId)}
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

                      </View>
                    )}
                ListHeaderComponent={renderHeader()}
                ListFooterComponent={renderFooter()}
                keyExtractor={(item) => item?.serviceId ? item?.serviceId + "serviceItemBooking" : item?.productId + "productItemBooking"}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    <View />
                    <IconButton
                      icon={images.iconTrash}
                      iconStyle={styles.iconTrash}
                      style={styles.buttonDelete}
                      onPress={() => data?.item?.productId ? deleteProduct(data.item) : data?.item?.giftCardId ? deleteGiftCard(data.item) : deleteService(data.item)}
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


      <DropdownAlert
        ref={alertRef}
        closeInterval={2000}
        infoColor="#1B68AC"
        titleStyle={styles.titleAlertStyle}
        messageStyle={styles.messageAlertStyle}
        defaultContainer={styles.alertStyle}
        renderImage={() => <Image source={images.harmonyPay} style={styles.iconHarmonyPay} />}
      />

    </>
  );
};

const styles = StyleSheet.create({
  messageAlertStyle: {
    fontSize: scaleFont(15),
    color: "white",
    fontFamily: fonts.REGULAR
  },

  titleAlertStyle: {
    fontSize: scaleFont(19),
    color: "white",
    fontFamily: fonts.BOLD
  },

  alertStyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 8
  },

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
    marginLeft: scaleWidth(16),
    alignItems: "center"
  },
  iconHarmonyPay: {
    width: scaleWidth(45),
    height: scaleWidth(45),
    tintColor: "white"
  }
});
