import React from 'react';
import { Animated } from 'react-native';
import { scaleWidth, scaleHeight } from '@utils';

const animatedHook = () => {
  const bottomAnimated = React.useRef(
    new Animated.Value(scaleHeight(1.5)),
  ).current;
  const fontSizeAnimated = React.useRef(
    new Animated.Value(scaleWidth(4.5)),
  ).current;
  const leftAnimated = React.useRef(new Animated.Value(scaleWidth(25))).current;

  const openInput = () => {
    setOpenInput(true);
    animatedInput();
  };

  const animatedInput = () => {
    Animated.parallel([
      Animated.timing(bottomAnimated, {
        toValue: scaleHeight(8.5),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnimated, {
        toValue: scaleWidth(5.6),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(leftAnimated, {
        toValue: scaleWidth(16),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return [animatedInput, bottomAnimated, fontSizeAnimated, leftAnimated];
};

export default animatedHook;
