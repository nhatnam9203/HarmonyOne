import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { SplashScreen, ScreenName } from '../screens';
import { isReadyRef, navigationRef } from './NavigationService';
import LaunchScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const { Screen, Navigator } = createStackNavigator();

export class RootNavigation extends Component {

  constructor(props) {
    super(props);
    this.isReadyRef = isReadyRef;
  }

  componentDidMount() {
    LaunchScreen.hide();
  }

  componentWillUnmount() {
    this.isReadyRef.current = false;
  }

  render() {
    const { theme } = this.props;
    return (
      <NavigationContainer
        ref={navigationRef}
        headerMode="none"
        screenOptions={{
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          }),
          gestureEnabled: false,
        }}
        onReady={() => {
          this.isReadyRef.current = true;
        }}>
        <StatusBar barStyle="light-content" />

        <Navigator headerMode="none">
          <Screen {...SplashScreen} />
          <Screen name="AuthStack" component={AuthStack} />
          <Screen name="HpOneStack" component={AppStack} />
        </Navigator>
      </NavigationContainer>
    )
  }
}