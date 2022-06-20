import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, IconButton, Button } from "@shared/components";
import { isEmpty } from "lodash";
import { TextInputMask } from "react-native-masked-text";
import { ExtraOfService } from './ExtraOfService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatMoney } from "@shared/utils";
export const Layout = ({
  item,
  back,
  extrasService,
  price,
  tip,
  setPrice,
  setTip,
  isEditPrice,
  isEditTip,
  setStatusEditPrice,
  setStatusEditTip,
  editService,
  onChangeExtraService,
  inputPriceRef,
  inputTipRef,
  getTotalPrice,
  getTotalDuration,
  invoiceViewAppointmentDetail,
}) => {

  
  return (
    <View style={styles.container}>
       <KeyboardAwareScrollView bounces={false} style={styles.content}>
        <View style={styles.containerBigImage}>
          {
            !isEmpty(item?.imageUrl) ?
              <CustomImage
                source={{ uri: item?.imageUrl, priority: "high" }}
                style={{ width: '100%', height: '100%' }}
                resizeMode='cover'
              /> :
              <CustomImage
                source={images.serviceDefault}
                style={{ width: '100%', height: '100%' }}
                resizeMode='cover'
              />
          }

          <IconButton
            icon={images.iconBack}
            iconStyle={styles.iconBack}
            style={styles.wrapIconBack}
            onPress={back}
          />
        </View>

        <View style={styles.containerDescription}>
          <Text style={styles.servivceName}>{item?.name ?? item?.serviceName}</Text>
          {
            item?.description !== "" && <Text style={styles.description}>
              {item?.description}
            </Text>
          }
        </View>

        <View style={styles.containerDuration}>
          {/******************************* EDIT PRICE ********************************/}
          <View style={[styles.rowBetween, { marginTop: scaleHeight(24) }]}>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>
              Price
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <View style={[styles.wrapPrice, { borderColor: isEditPrice ? "#dddddd" : "white" }]}>
                <Text style={[styles.duration, { fontSize: scaleFont(18) }]}>
                  $
                </Text>
                {
                  isEditPrice 
                  && invoiceViewAppointmentDetail?.paymentMethod != "credit_card"
                  && invoiceViewAppointmentDetail?.paymentMethod != "multiple"
                  && <TextInputMask
                    ref={inputPriceRef}
                    value={price}
                    onChangeText={text => setPrice(text)}
                    style={[styles.duration, { fontSize: scaleFont(18), paddingVertical: 7, flex: 0, includeFontPadding: false, }]}
                    type="money"
                    editable={isEditPrice}
                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  />
                }
                {
                  !isEditPrice && <Text
                    style={[styles.duration, { fontSize: scaleFont(18) }]}
                  >
                    {price}
                  </Text>
                }
              </View>

              {invoiceViewAppointmentDetail?.paymentMethod != "credit_card" 
              && invoiceViewAppointmentDetail?.paymentMethod != "multiple" && 
                <TouchableOpacity onPress={() => {
                  if (isEditPrice) {
                    setStatusEditPrice(false);

                  } else {
                    setStatusEditPrice(true);
                    setTimeout(() => {
                      inputPriceRef?.current?._inputElement?.focus();
                    }, 250);
                  }
                }}
                >
                  <Image
                    source={!isEditPrice ? images.penEdit : images.iconChecked}
                    resizeMode='contain'
                    style={[styles.iconEditPencil, { tintColor: !isEditPrice ? "#333" : "#4AD100" }]}
                  />
                </TouchableOpacity>
              }
            </View>
          </View>
       
           {/******************************* EDIT TIP ********************************/}
          <View style={[styles.rowBetween, { marginTop: scaleHeight(24) }]}>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>
              Tip
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <View style={[styles.wrapPrice, { borderColor: isEditPrice ? "#dddddd" : "white" }]}>
                <Text style={[styles.duration, { fontSize: scaleFont(18) }]}>
                  $
                </Text>
                {
                  isEditTip && <TextInputMask
                    ref={inputTipRef}
                    value={tip}
                    onChangeText={text => setTip(text)}
                    style={[styles.duration, { fontSize: scaleFont(18), paddingVertical: 7, flex: 0, includeFontPadding: false, }]}
                    type="money"
                    editable={isEditTip}
                    options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  />
                }
                {
                  !isEditTip && <Text
                    style={[styles.duration, { fontSize: scaleFont(18) }]}
                  >
                    {tip}
                  </Text>
                }
              </View>

              <TouchableOpacity onPress={() => {
                if (isEditTip) {
                  setStatusEditTip(false);

                } else {
                  setStatusEditTip(true);
                  setTimeout(() => {
                    inputTipRef?.current?._inputElement?.focus();
                  }, 250);
                }
              }}
              >
                <Image
                  source={!isEditPrice ? images.penEdit : images.iconChecked}
                  resizeMode='contain'
                  style={[styles.iconEditPencil, { tintColor: !isEditPrice ? "#333" : "#4AD100" }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {
          extrasService && extrasService?.length > 0 &&
          <ExtraOfService
            extras={extrasService}
            service={item}
            onChangeExtraService={onChangeExtraService}
            isEditExtraPrice={invoiceViewAppointmentDetail?.paymentMethod != "credit_card"
                              && invoiceViewAppointmentDetail?.paymentMethod != "multiple"}
          />
        }
        <View style={styles.totalRow}>
          <View style={{ flexDirection: 'row' }}>
              <Text style={styles.total}>Total:</Text>
              <Text style={styles.total}>{getTotalDuration()}</Text>
          </View>
          <Text style={[styles.total, { fontFamily: fonts.BOLD }]}>
              {`$${getTotalPrice()}`}
          </Text>
        </View>
        <View style={styles.totalRow}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.total}>Tip:</Text>
            </View>
            <Text style={[styles.total, { fontFamily: fonts.BOLD }]}>
                {`$${formatMoney(tip)}`}
            </Text>
        </View>

        <View style={{ height: scaleHeight(100) }} />

      </KeyboardAwareScrollView>
      <View style={styles.bottom}>
        <Button
          label="Save"
          onPress={editService}
          highlight={true}
          width={'100%'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputPrice: {
    fontFamily: fonts.REGULAR,
    color: "#404040",
    fontSize: scaleFont(15)
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerDescription: {
    padding: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  duration: {
    fontFamily: fonts.REGULAR,
    color: "#404040",
    fontSize: scaleFont(15)
  },
  durationNumber: {

  },
  wrapDurationNumber: {
    height: scaleHeight(30),
    width: scaleWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 3,
    marginHorizontal: scaleWidth(10)
  },
  containerDuration: {
    padding: scaleWidth(16),
  },
  containerBigImage: {
    width: scaleWidth(375),
    height: scaleWidth(300),
    position: 'relative'
  },
  iconBack: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "#585858"
  },
  wrapIconBack: {
    position: 'absolute',
    top: scaleHeight(45),
    left: scaleWidth(16),
    borderRadius: 1000,
    backgroundColor: "#dddddd",
    width: scaleWidth(45),
    height: scaleWidth(45),
    justifyContent: 'center',
    alignItems: 'center'

  },
  servivceName: {
    fontFamily: fonts.MEDIUM,
    color: colors.ocean_blue,
    fontSize: scaleFont(19)
  },
  description: {
    fontFamily: fonts.LIGHT,
    color: "#404040",
    fontSize: scaleFont(15),
    marginTop: scaleHeight(16)
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
  iconEditPencil: {
    width: scaleWidth(16),
    height: scaleWidth(16),
    tintColor: "#404040"
  },
  wrapPrice: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scaleWidth(12),
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingVertical: scaleWidth(8),
    // height: scaleHeight(45),
    width: scaleWidth(120),
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(16),
    paddingRight: scaleWidth(16)
  },
  total: {
    marginLeft: scaleWidth(17),
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(17),
    letterSpacing: 0,
    color: colors.greyish_brown_40,
  },
});
