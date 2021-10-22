/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */
import { StyleSheet } from 'react-native';

export const colors = {
  dark_indigo: '#0e0e3f',
  ocean_blue: '#0764b0',
  greyish_brown_40: '#404040',
  bluegrey: '#7a98bb',
  dark_green: '#143800',
  muddy_green: '#666633',
  frog_green: '#4ad100',
  butter: '#ffff80',
  white: '#ffffff',
  gunmetal: '#546263',
  pale_blue: '#d4f8fc',
  azure: '#19a9ec',
  marine: '#093c54',
  greyish_brown_54: '#545454',
  greyish_teal: '#809596',
  black: '#000000',
  red: '#EA212D',
  white_fa: '#fafafa',
};

export const fonts = {
  REGULAR: 'SFProText-Regular',
  MEDIUM: 'SFProText-Medium',
  LIGHT: 'SFProText-Light',
  ITALIC: 'SFProText-Italic',
  BOLD: 'SFProText-Bold',
  ROBOTO: 'Roboto',
};

export const textStyles = StyleSheet.create({
  sf_pt_regular_15: {
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(15),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.white,
  },
  sf_pt_light_14: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(14),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.white,
  },
  sf_pt_medium_17_500: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.black,
  },
  sf_pt_medium_500: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.black,
  },
});

export const layouts = StyleSheet.create({
  fill: {
    flex: 1,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontalSpaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalCenterLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  horizontalCenterLeft: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  horizontalCenterRight: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  marginVertical: {
    height: scaleHeight(16),
  },
  marginHorizontal: {
    width: scaleWidth(16),
  },

  formRow: {
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
    paddingHorizontal: scaleWidth(16),
    height: scaleHeight(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
