import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingAppointment from "./UpcomingAppointment";
import PastAppointment from "./PastAppointment";
import { translate } from "@localize";
import { useSelector } from "react-redux";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const CustomerAppointments = ({
    upcomings,
}) => {

    const language = useSelector(state => state.dataLocal.language);

    return (
        <View style={styles.container}>
            <Navigator
                initialRouteName="UpcomingAppointment"
                swipeEnabled={false}
                tabBarOptions={{
                    indicatorStyle : {
                        height: 3,
                        backgroundColor : colors.ocean_blue
                    },
                    labelStyle : {
                        fontFamily : fonts.REGULAR,
                        fontSize : scaleFont(16)
                    },
                    style: {
                        backgroundColor: colors.white,
                        width: 250,
                        elevation : 0
                    },
                    allowFontScaling : false
                }}
            >
                <Screen
                    name="UpcomingAppointment"
                    options={{ tabBarLabel: translate('Upcoming') }}
                >
                {
                    props => <UpcomingAppointment {...props} upcomings={upcomings} language={language} />
                }
                </Screen>
                <Screen
                    name="PastAppointment"
                    options={{ tabBarLabel: translate('Past') }}
                >
                {
                    props => <PastAppointment language={language} />
                }
                </Screen>
            </Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: scaleHeight(16),
        height: scaleHeight(400),
        backgroundColor: colors.white,
    },
});

export default CustomerAppointments;
