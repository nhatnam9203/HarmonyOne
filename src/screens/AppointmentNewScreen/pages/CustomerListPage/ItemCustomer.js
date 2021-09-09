import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts } from "@shared/themes";

const ItemCustomer = ({ item }) => {
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.letter}>
                <Text style={styles.firstLetter}>
                    {item?.customerName?.toString().charAt(0)}
                </Text>
            </View>

            <View style={styles.rightItem}>
                <Text style={styles.customerName}>
                    {item?.customerName}
                </Text>
                <Text style={styles.phone}>
                    {item?.phone}
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
    },
    rightItem: {
        display: 'flex',
        justifyContent : 'space-between',
        marginLeft : scaleWidth(15)
    },
    letter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleWidth(60),
        height: scaleWidth(60),
        borderRadius: 500,
        backgroundColor: '#FAFAFA'
    },
    firstLetter: {
        fontSize: scaleWidth(30),
        fontWeight: "bold",
        color: "#1366AE",
        fontFamily : fonts.MEDIUM
    },
    customerName : {
        fontSize : scaleWidth(19),
        color : "#404040",
        fontFamily : fonts.MEDIUM
    },
    phone : {
        color: '#7A98BB',
        fontSize : scaleWidth(16),
        fontFamily : fonts.MEDIUM
    },
})

export default ItemCustomer;