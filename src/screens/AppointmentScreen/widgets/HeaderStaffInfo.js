import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@components';
import NavigationService from '@navigation/NavigationService';
import { useSelector } from 'react-redux';
import { images, colors, textStyles, fonts, layouts } from '@shared/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export const HeaderStaffInfo = () => {
  const [t] = useTranslation();
  const { staff = { displayName: 'Unknown', email: '', imageUrl: null } } =
    useSelector((state) => state.auth);
  const insets = useSafeAreaInsets();

  const onGoNotifyScreen = () => {};

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={images.imageHeaderBg}
        style={[
          styles.containerBg,
          { paddingTop: Math.max(insets.top, scaleHeight(20)) },
        ]}
        resizeMode="stretch">
        <View style={styles.content}>
          <View style={styles.staffContent}>
            <Image
              source={
                staff.imageUrl
                  ? { uri: staff.imageUrl }
                  : images.imageAvatarDefault
              }
              style={styles.avatar}
            />
            <View style={styles.staff}>
              <Text style={styles.nameStyle}>{`${t('Welcome')} ${
                staff?.displayName
              } !`}</Text>
              <View style={styles.staffMailBox}>
                <Image
                  source={images.iconMailBox}
                  style={styles.iconEmail}
                  resizeMode="center"
                />
                <Text style={styles.emailStyle}>{`${staff?.email}`}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={onGoNotifyScreen} style={styles.btnBell}>
            <Image
              source={images.iconBell}
              style={styles.iconBell}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },

  containerBg: {
    height: scaleHeight(100),
    width: '100%',
    paddingHorizontal: scaleWidth(16),
    justifyContent: 'center',
  },

  content: { flexDirection: 'row' },
  staffContent: { flex: 1, flexDirection: 'row' },
  avatar: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    borderRadius: scaleHeight(20),
  },
  staff: { flex: 1, marginLeft: scaleWidth(8) },
  staffMailBox: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  nameStyle: {
    ...textStyles.sf_pt_medium_17_500,
    color: colors.white,
    textAlign: 'left',
  },

  emailStyle: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(12),
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#f1f1f1',
  },

  iconEmail: {
    width: scaleWidth(12),
    height: scaleHeight(9),
    marginRight: scaleWidth(6),
  },

  btnBell: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  iconBell: {
    width: scaleWidth(24),
    height: scaleHeight(24),
  },
});
