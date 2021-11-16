import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { convertMinsToHrsMins } from '@utils'
import { fonts, colors, images } from "@shared/themes";
import { CustomImage } from "@shared/components";

export const ItemService = ({ item, onPress, renderDuration = null , titleStyle }) => {

    const img = item?.imageUrl ? { uri: item?.imageUrl } : images.serviceDefault;

    const onPressItem = () => {
        onPress(item);
    }

    return (
        <TouchableOpacity
            onPress={onPressItem}
            activeOpacity={1}
            style={[styles.row, styles.item]}
        >
            <CustomImage
                style={styles.iconService}
                source={img}
            />
            <View style={styles.containerRight}>
                <Text
                    fontFamily='medium'
                    style={[styles.serviceName,titleStyle]}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {item?.name}
                </Text>
                <View style={styles.row}>
                    {
                        renderDuration ? renderDuration( ) :
                        item?.duration ?
                            <Text style={styles.duration}>
                                {convertMinsToHrsMins(item.duration)}
                            </Text> : <View />
                    }
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
        paddingBottom: scaleHeight(16)
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
        width: scaleWidth(375 - 90 - 30),
        justifyContent: 'space-between',
        height: scaleWidth(70),
        marginLeft: scaleWidth(16)
    },
    serviceName: {
        fontSize: scaleWidth(16),
        color: '#1366AE',
        fontFamily: fonts.MEDIUM,
    },
    duration: {
        color: '#6A6A6A',
        fontSize: scaleWidth(16),
        fontFamily: fonts.REGULAR,
    },
    price: {
        fontSize: scaleWidth(16),
        color: '#404040',
        fontFamily: fonts.MEDIUM,
    },
})