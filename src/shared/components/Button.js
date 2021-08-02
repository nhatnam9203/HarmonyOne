import { colors, fonts, layouts, textStyles } from '@shared/themes';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export const Button = ({
  onPress,
  highlight = false,
  isLoading,
  disabled,
  height = scaleHeight(48),
  width = scaleWidth(100),
  label,
}) => {
  const [t] = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { height: height, width: width },
        highlight && { backgroundColor: colors.ocean_blue },
      ]}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color="white" />
      ) : (
        <Text
          fontFamily="medium"
          style={[styles.text, highlight && { color: colors.white }]}>
          {label ?? t('Continue')}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.ocean_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    ...textStyles.sf_pt_medium_500,
    color: colors.ocean_blue,
  },
});
