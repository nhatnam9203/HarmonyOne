
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { images, fonts } from '@shared/themes';
import { IconButton, ListEmptyComponent } from "@shared/components";
import { AppointmentItem } from "./AppointmentItem";
import { useTranslation } from "react-i18next";
import { guid } from "@shared/utils";
import sortArray from "sort-array";

const AppointmentList = ({
    blockTimes = [],
    onChangeAppointmentId,
    isRefresh,
    onRefresh,
}) => {

    const [t] = useTranslation();

    // const temptData = sortArray(blockTimes, {
    //     by: "appointmentId",
    //     order: "ASC",
    //   });

    return (
        <FlatList
            style={styles.flatList}
            data={blockTimes}
            renderItem={({ item }) => <AppointmentItem item={item} onChangeAppointmentId={onChangeAppointmentId} />}
            refreshing={isRefresh}
            onRefresh={onRefresh}
            keyExtractor={(item) => item?.appointmentId?.toString() + guid() + 'appointment'}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} image={images.iconNotFound} />}
            ListFooterComponent={()=><View style={{ height : scaleHeight(100) }} />}
        />
    );
};

export default AppointmentList;


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        paddingTop: scaleHeight(12)
    },
});
