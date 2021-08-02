import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { textStyles, colors, svg, layouts, images } from '@shared/themes';
import LottieView from 'lottie-react-native';
import { Bar } from 'react-native-progress';
import { useTranslation } from 'react-i18next';

export const Layout = ({ progress = 0 }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContent}>
        <LottieView
          source={svg.logo_fade}
          style={styles.stepIndicator}
          autoPlay
          loop={false}
        />
        {/* <Image source={images.logo} resizeMode="center" /> */}
      </View>

      <View style={styles.textContent}>
        <View style={styles.loadingBarContent}>
          <Text style={styles.textLabel}>{t('Checking Version')}</Text>
          <View style={layouts.marginVertical} />
          <Bar
            progress={progress}
            width={scaleWidth(200)}
            height={scaleHeight(8)}
            indeterminate={true}
            indeterminateAnimationDuration={1500}
            color="#fffd"
            unfilledColor="#fff2"
            style={styles.progressBackground}
            borderWidth={0}
          />
          <View style={layouts.marginVertical} />
          <Text style={styles.textPercent}>{`${progress}%`}</Text>
        </View>
        <Text style={textStyles.sf_pt_light_14}>{t('Version for staff')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.dark_indigo,
  },

  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  stepIndicator: {
    width: '100%',
  },

  textContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: scaleHeight(20),
  },

  loadingBarContent: {
    marginVertical: scaleHeight(20),
    flex: 0,
    alignItems: 'center',
  },

  textLabel: {
    color: '#fff',
    fontSize: scaleFont(15),
    fontWeight: '500',
  },

  textPercent: {
    color: '#fff',
    fontSize: scaleFont(14),
    marginBottom: scaleHeight(6),
    marginTop: scaleHeight(10),
    fontWeight: '600',
  },
});
