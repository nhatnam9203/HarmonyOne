import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { colors, images, fonts } from "@shared/themes";
import { IconButton } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

export const Total = () => {

    const addService = () => {
        NavigationService.navigate("Services");
    }

    return (
        <View style={styles.container}>
            <IconButton
                icon={images.iconPlus}
                iconStyle={styles.iconPlus}
                style={styles.buttonPlus}
                renderText={() => <Text style={styles.txtNew}>Add another service</Text>}
            />
            <View style={styles.row}>
                <Text style={styles.txt}>Total duration</Text>
                <Text style={styles.txt}>70 min</Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.txt,{ fontFamily : fonts.BOLD }]}>Total</Text>
                <Text style={[styles.txt,{ fontFamily : fonts.BOLD, color : '#50CF25' }]}>$ 69.00</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        marginTop: scaleHeight(16)
    },
    buttonPlus: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontFamily: fonts.REGULAR
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal : scaleWidth(16),
        width: '100%',
        marginTop : scaleHeight(12)
    },
    txt : {
        fontSize : scaleFont(17),
        color: '#7B99BA',
        fontFamily : fonts.REGULAR
    }
});

export default Total;
