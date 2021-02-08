import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';
import { RootComponent } from '@components';

import { StatusBar } from 'react-native';
import Auth from './Auth';
import Main from './Main';
import AppStack from './AppStack';

const Stack = createStackNavigator();

const App = (props) => {
  const { theme } = props;
  const { isLogin } = useSelector(state => state.loginReducer);
  return (
    <RootComponent>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={theme && theme.dark ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          {
            isLogin ?
              <Stack.Screen
                name="Auth"
                component={Auth}
              />
              :
              <Stack.Screen
                name="AppStack"
                component={AppStack}
              />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </RootComponent>
  );
};

export default App;
