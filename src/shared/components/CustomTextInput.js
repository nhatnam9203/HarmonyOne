import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export const CustomTextInput = ({
  children,
  style,
  inputStyle = {},
  border,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, style, border && styles.border]}>
      <TextInput
        style={[styles.inputStyle, inputStyle]}
        placeholderTextColor="#9E9E9E"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        {...inputProps}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(44),
    width: '100%',
    paddingHorizontal: scaleHeight(8),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  inputStyle: {
    fontSize: scaleFont(15),
    textAlign: 'left',
    padding: 0,
    paddingLeft: scaleWidth(6),
    color: '#484848',
    flex: 1,
  },

  border: { borderWidth: 1, borderColor: '#BCBCBC' },
});
