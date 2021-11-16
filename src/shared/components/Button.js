import { colors, fonts, layouts, textStyles } from '@shared/themes';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableRipple } from "react-native-paper"
import { useSelector } from "react-redux";

export const Button = ({
  onPress,
  highlight = false,
  isLoading,
  disabled = false,
  height = scaleHeight(55),
  width = scaleWidth(100),
  label,
  styleButton,
  styleText,
}) => {
  const [t] = useTranslation();

  const appLoading = useSelector(state => state.app.appLoading);

  const ButtonRender = Platform.OS == "ios" ? Pressable : TouchableRipple;

  return (
    <ButtonRender
      onPress={onPress}
      style={[
        styles.button,
        { height: height, width: width },
        highlight && { backgroundColor: colors.ocean_blue },
        disabled && { backgroundColor: "#EEEEEE", borderColor: "#EEEEEE" },
        styleButton,
      ]}
      disabled={disabled || appLoading}
    >
      {
        isLoading ? (
          <ActivityIndicator size={'small'} color="white" />
        ) : (
          <Text
            fontFamily="medium"
            style={[
              styles.text, highlight && { color: colors.white },
              disabled && { color: "#CCCCCC" },
              styleText,
            ]}
          >
            {label ?? t('Continue')}
          </Text>
        )}
    </ButtonRender>
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
    fontFamily: fonts.MEDIUM
  },
});
