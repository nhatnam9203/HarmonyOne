import React, { Component } from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { SplashScreen, ScreenName } from '../screens';
import { isReadyRef, navigationRef } from './NavigationService';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LaunchScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {RootComponent} from "@components";

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
      <SafeAreaProvider>
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
          <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
          <RootComponent>
          <Navigator headerMode="none"
            screenOptions={{
              gestureEnabled: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            <Screen {...SplashScreen} />
            <Screen name="AuthStack" component={AuthStack} />
            <Screen name="HpOneStack" component={AppStack} />
          </Navigator>
          </RootComponent>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}