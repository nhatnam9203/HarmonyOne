import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentList from '../AppointmentList'
import Schedule from '../Schedule'

const Home = createStackNavigator();

const HomeStack = () => {
    return (
            <Home.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
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
