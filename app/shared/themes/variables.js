/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */
import { StyleSheet } from 'react-native';

export const colors = {
  dark_indigo: '#0e0e3f',
  ocean_blue: '#0764b0',
  white: '#ffffff',
  frog_green: '#4ad100',
  pale_blue: '#d4f8fc',
  butter: '#ffff80',
  greyish_brown_40: '#404040',
  bluegrey: '#7a98bb',
  dark_green: '#143800',
  muddy_green: '#666633',
  gunmetal: '#546263',
  azure: '#19a9ec',
  marine: '#093c54',
  greyish_brown_54: '#545454',
  greyish_teal: '#809596',
  black: '#000000',
  red: '#db0000',
};

export const fonts = {
  REGULAR: 'Roboto-Regular',
  MEDIUM: 'Roboto-Medium',
  LIGHT: 'Roboto-Light',
  ITALIC: 'Roboto-Italic',
  BOLD: 'Roboto-Bold',
};

export const textStyles = StyleSheet.create({
  sf_pro_text_24_pt: {
    fontFamily: 'SFProText',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.dark_indigo,
  },
  sf_pro_text_22_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.gunmetal,
  },
  sf_pro_text_22_pt: {
    fontFamily: 'SFProText',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.dark_green,
  },
  sf_pro_text_18_pt_4: {
    fontFamily: 'SFProText',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_18_pt_3: {
    fontFamily: 'SFProText',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.ocean_blue,
  },
  sf_pro_text_18_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: '#585858',
  },
  sf_pro_text_18_pt: {
    fontFamily: 'SFProText',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_17_pt: {
    fontFamily: 'SFProText',
    fontSize: 17,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: colors.black,
  },
  sf_pro_text_16_pt_5: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.ocean_blue,
  },
  sf_pro_text_16_pt_3: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.greyish_brown_40,
  },
  sf_pro_text_16_pt_8: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.dark_indigo,
  },
  sf_pro_text_16_pt_6: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.greyish_brown_40,
  },
  sf_pro_text_16_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: '#27aae1',
  },
  sf_pro_text_16_pt: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: '#a9a9a9',
  },
  sf_pro_text_16_pt_7: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: '#e12727',
  },
  sf_pro_text_16_pt_4: {
    fontFamily: 'SFProText',
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: -0.32,
    color: colors.black,
  },
  sf_pro_text_14_pt_4: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.gunmetal,
  },
  sf_pro_text_14_pt_3: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.dark_green,
  },
  sf_pro_text_14_pt: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_14_pt_7: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.bluegrey,
  },
  sf_pro_text_14_pt_6: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.ocean_blue,
  },
  sf_pro_text_14_pt_5: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.greyish_brown_40,
  },
  sf_pro_text_14_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_13_pt: {
    fontFamily: 'SFProText',
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_13_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
  },
  sf_pro_text_12_pt: {
    fontFamily: 'SFProText',
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.greyish_brown_40,
  },
  sf_pro_text_12_pt_2: {
    fontFamily: 'SFProText',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',

    letterSpacing: 0,
    color: colors.greyish_brown_40,
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
    height: scaleHeight(8),
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
