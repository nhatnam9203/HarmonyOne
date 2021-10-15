import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "./Title";

export const BasicInformation = ({
    text = "Personal Info",
    onEdit = () => { },
    webLink,
    businessName,
    cellphone,
    email,
}) => {

    const openLinkWebsite = () => {
        if(webLink){
            Linking.openURL(webLink)
        }
    }

    return (
        <View style={styles.container}>
            <Title text="Basic Informations" />

            <CustomInput
                label='Business name'
                style={{ marginTop: scaleHeight(8) }}
                renderInput={() =>
                    <Text style={styles.txtItem}>{businessName}</Text>
                }
            />
            <CustomInput
                label='Phone number'
                renderInput={() =>
                    <Text style={styles.txtItem}>{cellphone}</Text>
                }
            />
            <CustomInput
                label='Contact email'
                renderInput={() =>
                    <Text style={styles.txtItem}>{email}</Text>
                }
            />
            <CustomInput
                label='Website'
                renderInput={() =>
                    <TouchableOpacity onPress={openLinkWebsite}>
                        <Text style={[styles.txtItem, { color: colors.ocean_blue, marginBottom: scaleHeight(16), fontFamily: fonts.REGULAR, textDecorationLine: 'underline' }]}>
                            {webLink}
                        </Text>
                    </TouchableOpacity>
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
        fontFamily: fonts.MEDIUM,
        color : "#404040"
    }
});
