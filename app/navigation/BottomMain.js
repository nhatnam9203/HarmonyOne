import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, View, Animated } from 'react-native';
import { Home } from '@screens';
import { scaleWidth } from '@utils';
import { Text } from '@components';
import {
    calendar_bottom,
    statistic_bottom,
    setting_bottom,
    information_bottom
} from '@assets';
import Main from './Main';

const BottomStack = createBottomTabNavigator();

const IconTab = ({ focused, source }) => {
    return (
        <View style={{ position: "relative" }}>
            <Image
                source={source}
                resizeMode="contain"
                style={{
                    width: scaleWidth(5.2),
                    height: scaleWidth(5.2),
                    tintColor: focused ? '#1366AE' : "#7B99BA",
                }}
            />
        </View>
    )
}


const LabelTab = ({ focused, color, title }) => {
    return (
        <Text
            fontSize={scaleWidth(3.5)}
            color={focused ? '#1366AE' : "#7B99BA"}
            fontFamily={focused ? 'medium' : 'regular'}
        >
            {title}
        </Text>
    );
}

const Bottom = () => {
    return (
        <BottomStack.Navigator
            initialRouteName='Main'
            tabBarOptions={{
                allowFontScaling: false,

            }}
        >
            <BottomStack.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => <IconTab source={calendar_bottom} focused={focused} />,
                    tabBarLabel: ({ focused, color }) => (
                        <LabelTab title="Appointment" focused={focused} color={color} />
                    ),
                }}
            />
            <BottomStack.Screen
                name="Statistic"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => <IconTab source={statistic_bottom} focused={focused} />,
                    tabBarLabel: ({ focused, color }) => (
                        <LabelTab title="Statistics" focused={focused} color={color} />
                    ),
                }}
            />
            <BottomStack.Screen
                name="Informations"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => <IconTab source={information_bottom} focused={focused} />,
                    tabBarLabel: ({ focused, color }) => (
                        <LabelTab title="Informations" focused={focused} color={color} />
                    ),
                }}
            />
            <BottomStack.Screen
                name="Settings"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => <IconTab source={setting_bottom} focused={focused} />,
                    tabBarLabel: ({ focused, color }) => (
                        <LabelTab title="Settings" focused={focused} color={color} />
                    ),
                }}
            />
        </BottomStack.Navigator>
    );
};

export default Bottom;
