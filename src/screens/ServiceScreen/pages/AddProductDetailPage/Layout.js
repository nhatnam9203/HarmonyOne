import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, IconButton, Button } from "@shared/components";
import { slop, formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { isEmpty } from "lodash";
import { TextInputMask } from "react-native-masked-text";
import { translate } from "@localize";


export const Layout = ({
  item,
  quantity,
  onChangeQuantity,
  addMoreProduct,
  extraListRef,
  extrasService,
  isEditItem,
  editProduct,
  back,

  price,
  setPrice,
  isEditPrice,
  setStatusEditPrice,
}) => {

  let tempPrice = parseFloat(formatNumberFromCurrency(price)) * quantity;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={styles.content}>
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
          <Text style={styles.servivceName}>{item?.name}</Text>
          {
            item?.description !== "" && <Text style={styles.description}>
              {item?.description}
            </Text>
          }
        </View>

        <View style={styles.containerDuration}>
          {/******************************* CỘNG TRỪ QUANTITY ********************************/}
          <View style={styles.rowBetween}>
            <Text style={styles.duration}>{translate("Items")}</Text>
            <View style={styles.row}>
              <Button
                onPress={() => { onChangeQuantity(quantity - 1) }}
                highlight={true}
                disabled={quantity <= 1}
                height={scaleHeight(30)}
                width={scaleWidth(50)}
                label="-1"
              />
              <View style={styles.wrapDurationNumber}>
                <Text style={[styles.duration, styles.durationNumber]}>
                  {quantity}
                </Text>
              </View>
              <Button
                onPress={() => { onChangeQuantity(quantity + 1) }}
                highlight={true}
                height={scaleHeight(30)}
                width={scaleWidth(50)}
                label="+1"
              />
            </View>
          </View>

          {/******************************* EDIT PRICE ********************************/}
          <View style={[styles.rowBetween, { marginTop: scaleHeight(24) }]}>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>{translate("Price")}</Text>
            <Text style={[styles.duration, { fontSize: scaleFont(18) }]}>
              {`$ ${formatMoney(tempPrice)}`}
            </Text>
          </View>
        </View>

        <View style={{ height: scaleHeight(100) }} />

      </ScrollView>
      <View style={styles.bottom}>
        <Button
          label={translate("txtSave")}
          onPress={isEditItem ? editProduct : addMoreProduct}
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
    height: scaleHeight(30),
    width: scaleWidth(100),
    justifyContent: 'flex-end',
    paddingHorizontal: 8
  }
});
