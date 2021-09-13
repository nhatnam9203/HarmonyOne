import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { fonts } from "@shared/themes";
import NavigationService from '@navigation/NavigationService';

const CustomerInfo = ({ item }) => {

    const selectCustomer = () => {
        NavigationService.navigate(screenNames.CustomerListPage);
    }

    return (
        <View style={styles.item}>
            <View style={styles.letter}>
                <Text style={styles.firstLetter}>
                    {"Nam".toString().charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.rightItem}>
                <Text style={styles.customerName}>
                    {`Nam Nhat`}
                </Text>
                <Text style={styles.phone}>
                    {`0123-456-789`}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        marginTop: scaleHeight(10),
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
        width: scaleWidth(45),
        height: scaleWidth(45),
        borderRadius: 500,
        backgroundColor: '#FAFAFA'
    },
    firstLetter: {
        fontSize: scaleFont(22),
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
        fontSize: scaleWidth(14),
        fontFamily: fonts.REGULAR
    },
})

export default CustomerInfo;