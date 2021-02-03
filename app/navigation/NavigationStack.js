import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import { StatusBar } from 'react-native';
import Auth from './Auth';

const Stack = createStackNavigator();

const App = (props) => {
  const { theme } = props;
  const isLoggedIn = useSelector(
    (state) => state.loginReducer.isLoggedIn,
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="Auth"
          component={Auth}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
