import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Schedule, AppointmentDetail } from '@screens';

const Main = createStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Main.Screen name="Home" component={Home} />
    </Main.Navigator>
  );
};

export default MainStack;
