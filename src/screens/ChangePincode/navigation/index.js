import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OldPincode from '../widget/OldPincode'
import NewPincode from '../widget/NewPincode'

const Pincode = createStackNavigator();

const PincodeStack = () => {
    return (
        <Pincode.Navigator
            screenOptions={{
                gestureEnabled : false,
                headerShown: false,
            }}
            initialRouteName='OldPincode'
        >
            <Pincode.Screen
                name="OldPincode"
                component={OldPincode}
            />
            <Pincode.Screen
                name="NewPincode"
                component={NewPincode}
            />
        </Pincode.Navigator>
    );
};

export default PincodeStack;
