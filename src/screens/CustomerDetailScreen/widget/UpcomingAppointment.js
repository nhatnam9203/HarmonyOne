import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { ListEmptyComponent } from '@shared/components';
import { useTranslation } from "react-i18next";
import ItemAppointment from "./ItemAppointment";

const UpcomingAppointment = ({
    upcomings = []
}) => {

    const [t] = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                data={upcomings}
                renderItem={({ item }) => <ItemAppointment item={item} />}
                keyExtractor={(item) => item.appointmentId.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
                ListEmptyComponent={()=><ListEmptyComponent description={t('No Appointments')} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    flatList: {
        flex: 1,
        paddingBottom: scaleHeight(16)
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#eeeeee'
    }
});

export default UpcomingAppointment;
