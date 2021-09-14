import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity , Text } from 'react-native'
import { convertMinsToHrsMins } from '@utils'
import { fonts, colors , images } from "@shared/themes";

const ItemService = ({ item }) => {

    const img = item?.imageUrl ? { uri : item?.imageUrl } : images.serviceDefault
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.row, styles.item]}
        >
            <Image
                style={styles.iconService}
                source={img}
            />
            <View style={styles.containerRight}>
                <Text
                    fontFamily='medium'
                    style={styles.serviceName}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item?.name}
                </Text>
                <View style={styles.row}>
                    <Text style={styles.duration}>
                        {convertMinsToHrsMins(item.duration)}
                    </Text>
                    <Text fontFamily='medsium' style={styles.price}>
                        {`$ ${item.price}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemService;

const styles = StyleSheet.create({
    item: {
        marginTop: scaleHeight(16),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom : scaleHeight(16)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconService: {
        borderRadius: 5,
        height: scaleWidth(70),
        width: scaleWidth(70),
    },
    containerRight: {
        width: scaleWidth(375 - 90 - 26),
        justifyContent: 'space-between',
        height: scaleWidth(70),
        marginLeft: scaleWidth(16)
    },
    serviceName: {
        fontSize: scaleWidth(19),
        color: '#1366AE',
        fontFamily : fonts.MEDIUM,
    },
    duration: {
        color: '#6A6A6A',
        fontSize: scaleWidth(16),
        fontFamily : fonts.REGULAR,
    },
    price: {
        fontSize: scaleWidth(16),
        color: '#404040',
        fontFamily : fonts.MEDIUM,
    },
})