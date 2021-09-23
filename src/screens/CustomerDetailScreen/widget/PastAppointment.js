import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { useSelector } from "react-redux";
import { useAxiosQuery, getPastAppointmentByCustomer } from '@src/apis';
import ItemAppointment from "./ItemAppointment";

const PastAppointment = ({ }) => {

    const { customerDetail } = useSelector(state => state.customer);

    const [appointmentList, setAppointmentList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [isRefresh, setRefresh] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);

    const [, refetch] = useAxiosQuery({
        ...getPastAppointmentByCustomer(customerDetail?.customerId, currentPage),
        isLoadingDefault: currentPage === 1 ? true : false,
        enabled: true,
        onSuccess: (data, response) => {
            if (currentPage === 1) {
                setAppointmentList(data);
            } else {
                setAppointmentList(appointmentList.concat(data));
            }
            setTotalPage(response.pages);
            setLoading(false);
        },
    });

    const loadMore = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setLoading(true);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                data={appointmentList}
                renderItem={({ item }) => <ItemAppointment item={item} isPast={true} />}
                keyExtractor={(item) => item.appointmentId.toString()}
                ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={5}
                ListFooterComponent={() =>
                    <View style={styles.itemLoadMore}>
                        {
                            (isLoading && currentPage > 1) ?
                                <ActivityIndicator
                                    size="small"
                                    color="#0764B0"
                                /> : null
                        }
                    </View>}
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
        paddingBottom: scaleHeight(16)
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#eeeeee'
    },
    itemLoadMore: {
        height: scaleWidth(30),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(10)
    },
});

export default PastAppointment;