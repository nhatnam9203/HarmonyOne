import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts, images } from '@shared/themes';
import FastImage from 'react-native-fast-image';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";


export const CustomImage = ({ defaultImage,source,...props }) => {
  return <FastImage
  source={source}
    {...props} />;
};

const styles = StyleSheet.create({});
