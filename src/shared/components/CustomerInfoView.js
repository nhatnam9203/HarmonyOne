import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { colors, fonts, images, layouts } from '@shared/themes';
import { formatPhoneNumber } from '@shared/utils';
import { getCustomerInfoById, useAxiosQuery } from "@src/apis";
import { useDispatch } from "react-redux";
import { customer as customerAction } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const CustomerInfoView = ({
  customerId,
  firstName = 'Unknown',
  lastName = "Unknown",
  phoneNumber = "Unknown",
  onPress,
  isButtonRight = true,
}) => {
  const dispatch = useDispatch();

  const [, getCustomerById] = useAxiosQuery({
    ...getCustomerInfoById(customerId),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      if(response?.codeNumber == 200){
        dispatch(customerAction.setCustomerDetail(data));
        NavigationService.navigate(screenNames.CustomerDetailScreen);
      }else{
        alert(response?.message)
      }
    },
  });

  const onPressItem  =() =>{
    if(onPress){
      onPress();
      return;
    }
    customerId !== 0 && getCustomerById();
  }

  return (
    <Pressable onPress={onPressItem} style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstName?.charAt(0)?.toUpperCase()}</Text>
      </View>
      <View style={layouts.marginHorizontal} />
      <View style={styles.customerContent}>
        <Text style={styles.textName}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.textPhone}>{`${phoneNumber}`}</Text>
      </View>
      {isButtonRight && customerId !== 0 && <Image source={images.iconArrow} style={styles.arrow} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(80),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: scaleWidth(48),
    height: scaleHeight(48),
    borderRadius: scaleWidth(24),
    backgroundColor: colors.white_fa,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(23),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.55,
    textAlign: 'center',
    color: colors.ocean_blue,
  },

  customerContent: { flex: 1 },

  textName: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(20),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.48,
    textAlign: 'left',
    color: colors.greyish_brown_40,
    height: scaleHeight(30),
  },

  textPhone: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.36,
    textAlign: 'left',
    color: colors.bluegrey,
    height: scaleHeight(20),
  },

  arrow: {
    width: scaleWidth(6),
    height: scaleHeight(10),
  },
});
