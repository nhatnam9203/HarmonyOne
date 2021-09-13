import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors, images, fonts } from "@shared/themes";
import { IconButton } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

export const ServiceList = () => {

    return (
        <>
        <Text style={styles.title}>Services</Text>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        </>
    );
};

const Item = () => {
    return (
        <View style={styles.item}>
            <Image
                source={images.serviceDefault}
                style={styles.imgService}
            />
            <View style={styles.itemRight}>
                <Text style={styles.name}>
                    Delux Spa Manicure
                </Text>
                <View style={{ justifyContent : 'space-between' , flexDirection : 'row' }}>
                    <Text style={styles.duration}>25 min</Text>
                    <Text style={styles.price}>$ 28.90</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
        borderBottomWidth : 1,
        borderBottomColor : "#eeeeee",
        paddingVertical : scaleHeight(16),
        borderRightWidth : 5,
        borderRightColor : "red"
    },
    imgService: {
        width: scaleWidth(70),
        height: scaleWidth(70)
    },
    itemRight: {
        justifyContent : 'space-between',
        width: scaleWidth(375-70-16-16-16),
        marginLeft : scaleWidth(16)
    },
    name : {
        fontSize : scaleFont(20),
        color : colors.ocean_blue,
        fontFamily : fonts.MEDIUM
    },
    duration : {
        fontSize : scaleFont(16),
        color : '#404040',
        fontFamily : fonts.LIGHT
    },
    price : {
        fontSize : scaleFont(16),
        color : '#404040',
        fontFamily : fonts.BOLD
    },
    title: {
        fontSize : scaleFont(20),
        color : '#404040',
        fontFamily : fonts.BOLD,
        marginLeft : scaleWidth(16),
        marginBottom : scaleHeight(10)
    }
});

export default ServiceList;
