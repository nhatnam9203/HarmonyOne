import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "../../Title";
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

export const BasicInformation = ({
    text = "Personal Info",
    onEdit = () => { },
    webLink,
    businessName,
    phone,
    email,
}) => {

    const openLinkWebsite = () => {
        if (webLink) {
            Linking.openURL(webLink)
        }
    }

    return (
        <View style={styles.container}>
            <Title text="Basic Informations" onEdit={() => { NavigationService.navigate("BasicEdit") }} />

            <CustomInput
                label='Business Name'
                style={{ marginTop: scaleHeight(8) }}
                renderInput={() =>
                    <Text style={styles.txtItem}>{businessName}</Text>
                }
            />
            {
                !isEmpty(phone) && <CustomInput
                    label='Phone Number'
                    renderInput={() =>
                        <Text style={styles.txtItem}>{phone}</Text>
                    }
                />
            }
            {
                !isEmpty(email) && <CustomInput
                    label='Contact Email'
                    renderInput={() =>
                        <Text style={styles.txtItem}>{email}</Text>
                    }
                />
            }
            {
                !isEmpty(webLink) && <CustomInput
                    label='Website'
                    renderInput={() =>
                        <TouchableOpacity onPress={openLinkWebsite}>
                            <Text style={[styles.txtItem, { color: "#19A9EC", marginBottom: scaleHeight(16), fontFamily: fonts.REGULAR, textDecorationLine: 'underline' }]}>
                                {webLink}
                            </Text>
                        </TouchableOpacity>
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        color: "#404040"
    }
});
