window.Logger = require('./src/shared/helpers/logger');
const {
  scaleFont,
  scaleWidth,
  scaleHeight,
} = require('./src/shared/helpers/scaleSize');
window.scaleFont = scaleFont;
window.scaleWidth = scaleWidth;
window.scaleHeight = scaleHeight;

const { ScreenNames } = require('./src/screens/ScreenName');
window.screenNames = ScreenNames;
