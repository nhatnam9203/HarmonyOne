import * as React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Schedule from '../Schedule';

const Home = createMaterialTopTabNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator tabBar={() => <View />} initialRouteName="Schedule">
      <Home.Screen name="Schedule" component={Schedule} />
    </Home.Navigator>
  );
};

export default HomeStack;
