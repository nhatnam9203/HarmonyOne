import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts, images } from '@shared/themes';

const EmptyComponent = ({
  description,
  image = images.EmptyList,
  containerStyle,
  textStyle,
  renderLottiewView = null

}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {
        renderLottiewView ? renderLottiewView() :
          image ? <Image style={styles.imageStyle} source={image} resizeMode='cover' /> : <View />
      }
      {!!description && <Text style={[styles.textStyle, textStyle]}>{description}</Text>}
    </View>
  );
};

export const ListEmptyComponent = React.memo(EmptyComponent);


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleHeight(80),
  },

  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(17),
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
