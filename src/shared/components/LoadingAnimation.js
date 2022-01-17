import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native'


export const LoadingAnimation = ({

}) => {


  return (
    <View style={styles.container}>
      <View style={styles.loadingBg}>
        <LottieView source={require('../../assets/loading_animation.json')} autoPlay loop />
      </View>
    </View>
  ) 
};

const styles = StyleSheet.create({
  loadingBg: {
    width: scaleWidth(300),
    height: scaleHeight(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
    // backgroundColor: 'rgba(255,255,255,0.55)',
  },

  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex : 999999999999999,
    backgroundColor : "white"
  },

  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
