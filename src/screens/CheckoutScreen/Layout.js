import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, ItemSelect } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';

export const Layout = ({

}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Checkout')}
        isRight={true}
        isLeft={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            onPress={() => { }}
            icon={images.iconBell}
            iconStyle={styles.icon}
            style={styles.button}
          />
        }
      >
        <View style={styles.content}>
          <ItemSelect
            title={t('Walking customer')}
            icon={images.checkout_customer_icon}
            iconRight={images.plus}
            iconRightStyle={styles.iconPlus}
            iconLeftStyle={styles.iconWalking}
            textStyle={{ fontSize : scaleFont(18) }}
            onPress={() => { }}
          />
          <IconButton 
            icon={images.plus}
            style={styles.rowReverse}
            iconStyle={styles.iconPlus}
            renderText={()=><Text style={styles.addService}>Add services</Text>}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.white
  },

  content: {
    flex: 1,
  },

  icon: {
    tintColor: "#7B99BA",
    width: scaleHeight(20),
    height: scaleHeight(20),
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconPlus : {
    width : scaleWidth(16),
    height: scaleWidth(16),
    tintColor : colors.ocean_blue
  },

  iconWalking : {
    width : scaleWidth(28),
    height: scaleWidth(28),
  },

  addService : {
    fontSize : scaleFont(17),
    color : colors.ocean_blue,
    fontFamily : fonts.MEDIUM,
  },

  rowReverse : {
    justifyContent : 'space-between', 
    flexDirection: 'row-reverse', 
    padding : scaleWidth(20),
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee'
  }
});
