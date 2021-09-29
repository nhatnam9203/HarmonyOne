import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts, images } from '@shared/themes';

export const ListEmptyComponent = ({
  description,
  image = images.EmptyList,
}) => {
  return (
    <View style={styles.container}>
      {image && <Image style={styles.imageStyle} source={image} resizeMode='contain' />}
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
    fontSize: scaleFont(17),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.VERY_LIGHT_PINK_C_5,
  },

  imageStyle: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    marginVertical: scaleHeight(14),
  },
});
