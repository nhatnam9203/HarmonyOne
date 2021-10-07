
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { images, fonts } from '@shared/themes';
import { IconButton, ListEmptyComponent } from "@shared/components";
import { AppointmentItem } from "./AppointmentItem";
import { useTranslation } from "react-i18next";
import { guid } from "@shared/utils";

const AppointmentList = ({
    blockTimes = [],
}) => {

    const [t] = useTranslation();

    return (
        <FlatList
            style={styles.flatList}
            data={blockTimes}
            renderItem={({ item }) => <AppointmentItem item={item} />}
            keyExtractor={(item) => item?.appointmentId?.toString() + guid() + 'appointment'}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} />}
        />
    );
};

export default AppointmentList;


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingTop : scaleHeight(12)
    },
});
