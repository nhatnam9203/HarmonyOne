import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Notification, AppointmentDetail } from '@screens';
import BottomMain from './BottomMain';

const App = createStackNavigator();

const AppStack = () => {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false
            }}
            initialRouteName='BottomMain'
        >
            <App.Screen
                name="BottomMain"
                component={BottomMain}
            />
            <App.Screen
                name="Notification"
                component={Notification}
            />
            <App.Screen
                name="AppointmentDetail"
                component={AppointmentDetail}
            />
        </App.Navigator>
    );
};

export default AppStack;
