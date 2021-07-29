import * as React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppointmentList from '../AppointmentList'
import Schedule from '../Schedule'

const Home = createMaterialTopTabNavigator();

const HomeStack = () => {
    return (
        <Home.Navigator
            tabBar={() => <View />}
            initialRouteName='AppointmentList'
        >
            <Home.Screen
                name="AppointmentList"
                component={AppointmentList}
            />
            <Home.Screen
                name="Schedule"
                component={Schedule}
            />
        </Home.Navigator>
    );
};

export default HomeStack;
