import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const scaleText = (size) => wp(size);

const screenWidth = () => (width >= height ? width : height);

const screenHeight = () => (height >= width ? width : height);

const scaleWidth = (size) => {
  const widthScale = Math.round(screenWidth() * (size / 375));
  return Math.round(PixelRatio.roundToNearestPixel(widthScale));
};

const scaleHeight = (size) => {
  const heightScale = Math.round(screenHeight() * (size / 812));
  return Math.round(PixelRatio.roundToNearestPixel(heightScale));
};

const scale = width / 375;
function scaleFont(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

module.exports = {
  scaleFont,
  scaleHeight,
  scaleWidth,
  screenWidth,
  screenHeight,
  scaleText,
};
