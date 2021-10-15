import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "./Title";

export const Location = ({
    addressFull,
    latitude,
    longitude
}) => {
    return (
        <View style={styles.container}>
            <Title text="Location" />
            <CustomInput
                label='Address'
                style={{ marginTop: scaleHeight(8) }}
                renderInput={() =>
                    <Text style={styles.txtItem}>{addressFull}</Text>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM
    }
});
