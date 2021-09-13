import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { colors, images, fonts } from "@shared/themes";
import { IconButton } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

export const ServiceList = () => {

    const addService = () => {

    }

    return (
        <TouchableOpacity style={styles.buttonPlus} onPress={addService}>
            <Text style={styles.txtNew}>Add services</Text>
            <Image source={images.buttonPlus} style={styles.iconPlus} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonPlus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scaleWidth(345),
        marginTop: scaleHeight(16),
        marginBottom: scaleHeight(12),
        marginHorizontal: scaleWidth(15)
    },
    iconPlus: {
        width: scaleWidth(22),
        height: scaleWidth(22),
    },
    txtNew: {
        fontSize: scaleFont(16),
        color: '#1366AE',
        marginLeft: scaleWidth(15),
        fontFamily: fonts.MEDIUM
    },
});

export default ServiceList;
