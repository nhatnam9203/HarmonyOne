import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Animated } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { IconButton, Button, ProgressiveImage } from "@shared/components";
import { ExtraOfService } from './ExtraOfService';
import { slop } from "@shared/utils";
import { isEmpty } from "lodash";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from "@localize";


export const Layout = ({
  item,
  durationService,
  onChangeDurationService,
  goToSelectStaff,
  extraListRef,
  extrasService,
  onChangeExtraService,
  isEditItem,
  goToReview,
  back,

  price,
  setPrice,
  isEditPrice,
  setStatusEditPrice,
  inputPriceRef
}) => {

  const scroll = React.useRef(new Animated.Value(0)).current;

  const scaleImage = scroll.interpolate({
    inputRange: [scaleHeight(-230), 0],
    outputRange: [1.6, 1],
    extrapolate: "clamp"
  });

  const scrollImage = scroll.interpolate({
    inputRange: [0, scaleHeight(230)],
    outputRange: [0, -scaleHeight(230)],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.container}>

      <View style={[
        styles.containerBigImage,
        {
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 9
        }
      ]}>
        <IconButton
          icon={images.iconBack}
          iconStyle={styles.iconBack}
          style={[styles.wrapIconBack, { zIndex: 999999 }]}
          onPress={back}
        />

        <Animated.View style={{
          transform: [
            { scale: scaleImage },
            { translateY: scrollImage }
          ],
        }}>
          <ProgressiveImage
            url={item?.imageUrl}
            defaultSource={images.serviceDefault}
            resizeMode='cover'
            width={"100%"}
            height={"100%"}
          />
        </Animated.View>
      </View>

      <Animated.ScrollView
        style={[styles.content, { paddingTop: scaleHeight(230) }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          {
            useNativeDriver: true
          },
        )}
      >

        <View style={styles.containerDescription}>
          <Text style={styles.servivceName}>{item?.name}</Text>
          {
            item?.description !== "" && <Text style={styles.description}>
              {item?.description}
            </Text>
          }
        </View>

        <View style={styles.containerDuration}>
          {/******************************* CỘNG TRỪ DURATION ********************************/}
          <View style={styles.rowBetween}>
            <Text style={styles.duration}>{translate('Duration')} ({translate('min')})</Text>
            <View style={styles.row}>
              <Button
                onPress={() => { onChangeDurationService(durationService - 5) }}
                highlight={true}
                disabled={durationService <= 5}
                height={scaleHeight(30)}
                width={scaleWidth(50)}
                label="-5"
              />
              <View style={styles.wrapDurationNumber}>
                <Text style={[styles.duration, styles.durationNumber]}>{durationService}</Text>
              </View>
              <Button
                onPress={() => { onChangeDurationService(durationService + 5) }}
                highlight={true}
                height={scaleHeight(30)}
                width={scaleWidth(50)}
                label="+5"
              />
            </View>
          </View>

          {/******************************* EDIT PRICE ********************************/}
          <View style={[styles.rowBetween, { marginTop: scaleHeight(24) }]}>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>{translate('Price')}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", }}>
              <View style={[styles.wrapPrice, { borderColor: isEditPrice ? "#dddddd" : "white" }]}>
                <Text style={[styles.duration, { fontSize: scaleFont(18) }]}>
                  {`$ `}
                </Text>
                <TextInputMask
                      ref={inputPriceRef}
                      value={price}
                      onChangeText={text => setPrice(text)}
                      style={[styles.duration, { fontSize: scaleFont(18), paddingVertical: 7, flex: 0, includeFontPadding: false, }]}
                      type="money"
                      maxLength={6}
                      editable={isEditPrice}
                      options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                    />
              </View>

              <TouchableOpacity hitSlop={slop(20)} onPress={() => {
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
            </View>
          </View>

        </View>

        {
          item?.extras && item?.extras?.length > 0 &&
          <ExtraOfService
            extras={extrasService}
            durationService={durationService}
            onChangeExtraService={onChangeExtraService}
            service={item}
            servicePrice={price}
          />
        }

        <View style={{ height: scaleHeight(260) }} />
      </Animated.ScrollView>
      <View style={styles.bottom}>
        <Button
          label={translate("txtNext")}
          onPress={isEditItem ? goToReview : goToSelectStaff}
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
    height: scaleHeight(230),
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
  }
});
