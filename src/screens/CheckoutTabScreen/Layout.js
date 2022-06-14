import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, NotificationIcon, CustomerInfoView } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { SwipeListView } from 'react-native-swipe-list-view';
import { isEmpty } from "lodash";
import { translate } from "@localize";


export const Layout = ({
  addCustomer,
  customerBooking,
  changeCustomer,
  deleteCustomer,
  addService
}) => {

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('txtCheckout')}
        isRight={true}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <NotificationIcon />
        }
      >
        <View style={styles.content}>
          {
            isEmpty(customerBooking) ?
              <Pressable onPress={addCustomer} style={styles.rowReverse}>
                <Image
                  source={images.plus}
                  style={styles.iconPlus}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={images.checkout_customer_icon}
                    style={styles.iconWalking}
                  />
                  <Text style={styles.txtWalkingCustomer}>
                    {translate('txtWalkingCustomer')}
                  </Text>
                </View>
              </Pressable>

              :
              <View style={styles.containerSwipeListView}>
                <SwipeListView
                  showsVerticalScrollIndicator={false}
                  data={[customerBooking]}
                  scrollEnabled={false}
                  renderItem={(data, rowMap) => (
                    <View style={styles.rowItem}>
                      <View style={{ flex: 1 }}>
                        <CustomerInfoView
                          customerId={data?.item?.customerId}
                          firstName={data?.item?.firstName}
                          lastName={data?.item?.lastName}
                          phoneNumber={data?.item?.phone}
                          onPress={changeCustomer}
                          isButtonRight={false}
                        />
                      </View>
                      <View style={{ height: scaleHeight(80), width: 5, backgroundColor: colors.red }} />
                    </View>
                  )}
                  keyExtractor={(item) => item?.customerId + "customerBooking"}
                  renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                      <View />
                      <IconButton
                        icon={images.iconTrash}
                        iconStyle={styles.iconTrash}
                        style={styles.buttonDelete}
                        onPress={() => deleteCustomer()}
                      />
                    </View>
                  )}
                  disableRightSwipe={true}
                  leftOpenValue={0}
                  rightOpenValue={-scaleWidth(60)}
                />
              </View>
          }
          <IconButton
            icon={images.plus}
            style={styles.rowReverse}
            iconStyle={styles.iconPlus}
            renderText={() => <Text style={styles.addService}>{translate('txtAddServices')}</Text>}
            onPress={addService}
            resizeMode="cover"
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  content: {
    flex: 1,
  },

  iconPlus: {
    width: scaleWidth(18),
    height: scaleWidth(18),
  },

  iconWalking: {
    width: scaleWidth(30),
    height: scaleWidth(30),
  },

  addService: {
    fontSize: scaleFont(17),
    color: colors.ocean_blue,
    fontFamily: fonts.MEDIUM,
  },

  rowReverse: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems : "center",
    padding: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  txtWalkingCustomer: {
    marginLeft : scaleWidth(16),
    fontSize : scaleFont(18),
    fontFamily: fonts.MEDIUM,
    color : "#404040"
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
    marginTop: -2
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
  rowItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingLeft: scaleWidth(8)
  },

  containerSwipeListView: {
    height: scaleHeight(80),
    marginTop: scaleHeight(8),
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee"
  }
});
