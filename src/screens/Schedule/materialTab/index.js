import * as React from 'react';
import { createMaterialTopTabNavigator } from '@components/material-top-tabs'
import { scaleWidth } from '@utils';
import Upcoming from '../widget/Upcoming';
import Completed from '../widget/Completed';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        position: 'top',
      }}
      initialRouteName='Upcoming'
      tabBarOptions={{
        tabStyle: {
          width: scaleWidth(30),
          paddingTop: scaleWidth(5)
        },
        labelStyle: {
          fontSize: scaleWidth(4)
        },
        activeTintColor: "#1366AE",
        inactiveTintColor: '#7a7a7a',
        indicatorStyle: {
            backgroundColor: '#1366AE',
            height: 4
        },
      }}
    >
      <Tab.Screen name="Upcoming" component={Upcoming} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
}

export default MyTabs;