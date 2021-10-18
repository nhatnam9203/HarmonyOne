import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "../../Title";
import NavigationService from '@navigation/NavigationService';

export const OpeningHour = ({
    businessHour
}) => {
    return (
        <View style={styles.container}>
            <Title text="Opening hour" onEdit={()=>{ NavigationService.navigate("OpeningHourEdit") }} />
            {
                businessHour && Object.entries(businessHour).map((obj,index) => {
                    return (
                        <View key={obj[0] +"businessHour"} style={styles.row}>
                            <Text style={styles.txt}>{obj[0]}</Text>
                            <Text style={styles.txt}>
                                {`${Object.values(businessHour)[index].timeStart} - ${Object.values(businessHour)[index].timeEnd}`}
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(24)
    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical : scaleHeight(8)
    },
    txt: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#404040"
    }
});
