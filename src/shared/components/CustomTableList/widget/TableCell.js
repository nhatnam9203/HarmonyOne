import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { fonts } from '@shared/themes';

export const TableCell = ({
  style,
  children,
  onPress,
  text = 'Empty Value!',
  textStyle,
  getWidthForKey,
  height,
  columnKey,
  disabled = true,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        style,
        height && { height },
        getWidthForKey &&
          typeof getWidthForKey === 'function' && {
            width: getWidthForKey(columnKey),
          },
      ]}>
      {(!!text || text == 0) && (
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      )}
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: scaleWidth(8),
    paddingRight: scaleWidth(2),
    height: '100%',
  },

  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'grey',
    width: '100%',
  },

  verticalLine: {
    width: scaleWidth(1),
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
});
