import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export const SettingTextInput = ({
  title, 
  value, 
  placeholder, 
  onChangeText, 
  keyboardType,
  style,
  ...inputProps
}) => {
  return (
    <View style={styles.container} >
        <View style={styles.viewTitle} >
            <Text style={styles.textTitle} >
                {title}
            </Text>
        </View>
        <View style={[styles.viewTextInput, style]} >
            <TextInput
                style={{ flex: 1, fontSize: scaleFont(14) }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginTop: scaleHeight(20)
  },
  viewTitle: { 
    width: '40%', 
    justifyContent: 'center', 
  },
  textTitle: { 
    fontSize: scaleFont(13), 
    color: 'rgb(42,42,42)' 
  },
  viewTextInput: {
      height: scaleHeight(50), 
      width: '60%',
      borderColor: 'rgb(227,227,227)',
      borderWidth: scaleWidth(1), 
      justifyContent: 'center', 
  },
  border: { 
    borderWidth: 1, 
    borderColor: '#BCBCBC' 
  },
});
