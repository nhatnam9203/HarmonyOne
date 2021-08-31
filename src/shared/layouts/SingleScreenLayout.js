import { colors, fonts, layouts, images } from '@shared/themes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationService from '@navigation/NavigationService';

export const SingleScreenLayout = ({
  children,
  pageTitle = '',
  bounces = false,
  headerColor = colors.white,
  headerTintColor = colors.black,
  headerRightComponent = null,
}) => {
  const [t] = useTranslation();
  const insets = useSafeAreaInsets();

  const onGoBack = () => {
    NavigationService.back();
  };

  return (
    <View style={layouts.fill}>
      <View
        style={[
          styles.headContent,
          { paddingTop: Math.max(insets.top, scaleHeight(20)) },
          { backgroundColor: headerColor },
        ]}>
        <View style={styles.headerLeftContent}>
          <TouchableOpacity style={styles.button} onPress={onGoBack}>
            <Image
              source={images.iconBack}
              style={[styles.iconSize, { tintColor: headerTintColor }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenterContent}>
          <Text style={[styles.headTitle, { color: headerTintColor }]}>
            {pageTitle}
          </Text>
        </View>
        <View style={styles.headerRightContent}>
          {headerRightComponent && headerRightComponent()}
        </View>
      </View>

      <KeyboardAwareScrollView bounces={bounces}>
        <View style={[styles.container]}>{children}</View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(0),
    paddingVertical: scaleHeight(16),
  },

  buttonContent: {
    height: scaleHeight(84),
    backgroundColor: colors.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headContent: {
    width: '100%',
    height: scaleHeight(100),
    backgroundColor: colors.white,
    shadowColor: '#0000000c',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(4),
    flexDirection: 'row',
    paddingHorizontal: scaleWidth(16),
  },

  headTitle: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(20),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.black,
  },

  headerLeftContent: { flex: 0 },

  headerRightContent: {
    flex: 0,
  },

  headerCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconSize: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
