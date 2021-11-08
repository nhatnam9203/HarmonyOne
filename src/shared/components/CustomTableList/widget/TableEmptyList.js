import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fonts } from '@shared/themes';

export const TableEmptyList = ({ description, image }) => {
  return (
    <View style={styles.container}>
      {image && <Image style={styles.imageStyle} source={image} />}
      {!!description && <Text style={styles.textStyle}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },

  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'gray',
  },

  imageStyle: {
    width: scaleWidth(66),
    height: scaleHeight(80),
    marginVertical: scaleHeight(14),
  },
});
