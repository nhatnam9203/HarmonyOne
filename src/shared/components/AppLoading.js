import React from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-spinkit';
import LottieView from 'lottie-react-native'



const LOADING_TIME_OUT = 15000;
export const AppLoading = ({
  loading = false,
  onCancelLoading,
  transparent = false,
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const timer = React.useRef(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const startTimer = () => {
    timer.current = setTimeout(() => {
      if (onCancelLoading && typeof onCancelLoading === 'function') {
        onCancelLoading();
        clearTimer();
      }
    }, LOADING_TIME_OUT);
  };

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    if (isLoading) {
      clearTimer();
      startTimer();
    } else {
      clearTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.loadingBg}>
        <LottieView source={require('../../assets/loading.json')} autoPlay loop />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loadingBg: {
    width: scaleWidth(80),
    height: scaleHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
  },

  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex : 999999999999999
  },

  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
