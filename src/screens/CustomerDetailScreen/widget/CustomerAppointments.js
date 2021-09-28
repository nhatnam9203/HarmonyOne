import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingAppointment from "./UpcomingAppointment";
import PastAppointment from "./PastAppointment";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const CustomerAppointments = ({
    upcomings,
}) => {
    console.log({  })
    return (
        <View style={styles.container}>
            <Navigator
                initialRouteName="UpcomingAppointment"
                swipeEnabled={false}
                tabBarOptions={{
                    style: {
                        backgroundColor: colors.white,
                        width: 300
                    }
                }}
            >
                <Screen
                    name="UpcomingAppointment"
                    options={{ tabBarLabel: 'Upcoming' }}
                >
                {
                    props => <UpcomingAppointment {...props} upcomings={upcomings} />
                }
                </Screen>
                <Screen
                    name="PastAppointment"
                    options={{ tabBarLabel: 'Past' }}
                >
                {
                    props => <PastAppointment />
                }
                </Screen>
            </Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(16),
        height: scaleHeight(400),
        backgroundColor: colors.white,
    },
});

export default CustomerAppointments;