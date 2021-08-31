import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fonts, images } from '@shared/themes';
import FastImage from 'react-native-fast-image';

export const CustomImage = ({ defaultImage, ...props }) => {
  return <FastImage {...props} />;
};

const styles = StyleSheet.create({});
