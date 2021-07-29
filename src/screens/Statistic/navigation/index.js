import * as React from 'react';
import { createMaterialTopTabNavigator } from '@components/material-top-tabs'
import { scaleWidth } from '@utils';
import { Daily, Weekly, Monthly, Custom } from '../widget'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                position: 'top',
            }}
            initialRouteName='Upcoming' ß
            tabBarOptions={{
                tabStyle: {

                },
                labelStyle: {
                    fontSize: scaleWidth(4)
                },
                activeTintColor: "#1366AE",
                inactiveTintColor: '#585858',
                indicatorStyle: {
                    backgroundColor: '#28AAE9',
                    height: 4
                },
            }}
        >
            <Tab.Screen name="Daily" component={Daily} />
            <Tab.Screen name="Weekly" component={Weekly} />
            <Tab.Screen name="Monthly" component={Monthly} />
            <Tab.Screen name="Custom" component={Custom} />
        </Tab.Navigator>
    );
}

export default MyTabs;