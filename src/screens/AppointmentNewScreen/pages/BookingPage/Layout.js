import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { ReviewPage } from "./ReviewPage";
import { SelectDatePage } from "./SelectDatePage";
import { SelectServicePage } from "./SelectServicePage";

const { Navigator, Screen } = createStackNavigator();

export const Layout = () => {
    return (
        <View style={styles.container}>
            <Navigator
                initialRouteName={screenNames.SelectServicePage}
                swipeEnabled={false}
                headerMode="none"
            >
                <Screen {...SelectServicePage} />
                <Screen {...SelectDatePage} />
                <Screen {...ReviewPage} />
            </Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});