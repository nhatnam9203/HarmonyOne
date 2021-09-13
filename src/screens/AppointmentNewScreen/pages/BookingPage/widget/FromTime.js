import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { colors, images, fonts } from "@shared/themes";
import { IconButton } from "@shared/components";
import NavigationService from '@navigation/NavigationService';

export const FromTime = () => {

    const selectTime = () => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateTime}>
                Sunday, 14 Dec 2021
            </Text>
            <View style={{ flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', width : '100%' }}>
                <Text style={styles.textTime}>
                    10:00 AM
                </Text>
                <IconButton 
                    onPress={selectTime}
                    icon={images.iconClock}
                    iconStyle={styles.icon}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        marginHorizontal : scaleWidth(15)
    },
    dateTime : {
        fontSize : scaleFont(20),
        color : "#404040",
        fontFamily : fonts.REGULAR
    },
    textTime : {
        fontSize : scaleFont(23),
        color : colors.ocean_blue,
        fontFamily : fonts.MEDIUM,
        marginTop : scaleHeight(13)
    },
    icon : {
        width : scaleWidth(24),
        height: scaleWidth(24),
    }
});

export default FromTime;
