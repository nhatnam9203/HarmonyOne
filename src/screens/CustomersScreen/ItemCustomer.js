import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts } from "@shared/themes";
import NavigationService from '@navigation/NavigationService';

const ItemCustomer = ({ item }) => {

    const selectItem = () => {
        NavigationService.navigate(screenNames.BookingPage);
    }

    return (
        <TouchableOpacity onPress={selectItem} style={styles.item}>
            <View style={styles.letter}>
                <Text style={styles.firstLetter}>
                    {item?.firstName?.toString().charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.rightItem}>
                <Text style={styles.customerName}>
                    {`${item?.firstName} ${item?.lastName}`}
                </Text>
                <Text style={styles.phone}>
                    {`${item?.phone}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: scaleHeight(10),
        marginHorizontal: scaleWidth(15)
    },
    rightItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: scaleWidth(15)
    },
    letter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleWidth(47),
        height: scaleWidth(47),
        borderRadius: 500,
        backgroundColor: '#FAFAFA'
    },
    firstLetter: {
        fontSize: scaleWidth(30),
        fontWeight: "bold",
        color: "#1366AE",
        fontFamily: fonts.MEDIUM
    },
    customerName: {
        fontSize: scaleWidth(19),
        color: "#404040",
        fontFamily: fonts.MEDIUM
    },
    phone: {
        color: '#7A98BB',
        fontSize: scaleWidth(15),
        fontFamily: fonts.REGULAR
    },
})

export default ItemCustomer;