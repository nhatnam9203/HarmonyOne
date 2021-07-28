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
  return Math.round(screenWidth() * (size / 1024));
};

const scaleHeight = (size) => {
  return Math.round(screenHeight() * (size / 768));
};

const scale = width / 1024;
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
