import { colors, fonts, layouts, textStyles } from '@shared/themes';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Platform,
  Animated
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableRipple } from "react-native-paper"
import { useSelector } from "react-redux";

export const Button = ({
  onPress,
  highlight = false,
  isLoading,
  disabled = false,
  height = scaleHeight(47),
  width = scaleWidth(100),
  label,
  styleButton,
  styleText,
  isTurnOff = false,
  buttonDisableStyle,
  textDisableStyle
}) => {
  const [t] = useTranslation();

  const appLoading = useSelector(state => state.app.appLoading);

  const ButtonRender = Platform.OS == "ios" ? Pressable : TouchableRipple;

  const AnimatedButton = Animated.createAnimatedComponent(ButtonRender);

  const isHighLight = (highlight) ? true : false;

  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const zoomIn = () => {
    Animated.timing(animatedValue, { toValue: 1.03, duration: 300 }).start();
  };

  const zoomOut = () => {
    Animated.timing(animatedValue, { toValue: 1, duration: 300 }).start();
  };

  return (
    <AnimatedButton
      onPress={onPress}
      onPressIn={zoomIn}
      onPressOut={zoomOut}
      style={[
        styles.button,
        { height: height, width: width },
        isHighLight && {
          backgroundColor: colors.ocean_blue,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
        styleButton,
        disabled && { opacity: 0.5 },
        disabled && buttonDisableStyle,
        {
          transform: [{ scale: animatedValue }],
        }
      ]}
      disabled={disabled || appLoading || isTurnOff}
    >
      {
        isLoading && <ActivityIndicator size={'small'} color="white" style={{ marginRight: 10 }} />
      }
      <Text
        style={[
          styles.text,
          highlight && { color: colors.white },
          textDisableStyle,
          styleText,
        ]}
      >
        {label ?? t('Continue')}
      </Text>
    </AnimatedButton>
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
    flexDirection: "row"
  },

  text: {
    fontSize: scaleFont(17),
    color: colors.ocean_blue,
    fontFamily: fonts.BOLD_PRO
  },
});
