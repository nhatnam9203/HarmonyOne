import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { fonts, colors } from "@shared/themes";
import ItemAppointment from "./ItemAppointment";

const UpcomingAppointment = ({
    upcomings = []
}) => {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={upcomings}
                renderItem={({ item }) => <ItemAppointment item={item} />}
                keyExtractor={(item) => item.appointmentId.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    flatList: {
        flex: 1,
        paddingBottom : scaleHeight(16)
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor : '#eeeeee'
    }
});

export default UpcomingAppointment;
