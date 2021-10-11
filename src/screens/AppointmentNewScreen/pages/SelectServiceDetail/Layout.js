import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, IconButton, Button } from "@shared/components";
import { ExtraOfService } from './ExtraOfService';
import { isEmpty } from "lodash";


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
}) => {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
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
          {item?.description !== "" && <Text style={styles.description}>{item?.description}</Text>}
        </View>

        <View style={styles.containerDuration}>
          <View style={styles.rowBetween}>
            <Text style={styles.duration}>Duration (min)</Text>
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

          <View style={[styles.rowBetween, { marginTop: scaleHeight(24) }]}>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>Price</Text>
            <Text style={[styles.duration, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(18) }]}>{`$ ${item?.price}`}</Text>
          </View>
        </View>

        {
          item?.extras && item?.extras?.length > 0 &&
          <ExtraOfService
            extras={extrasService}
            durationService={durationService}
            onChangeExtraService={onChangeExtraService}
            service={item}
          />
        }

      </ScrollView>
      <View style={styles.bottom}>
        <Button
          label="Save"
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
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scaleWidth(8)
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
    top: scaleHeight(25),
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
});
