import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { images, colors, fonts } from "@shared/themes";
import { CustomInput } from "@shared/components";
import { slop } from "@shared/utils";
import { View } from 'react-native-animatable';
import { Title } from "../../Title";
import NavigationService from '@navigation/NavigationService';
import { translateManual } from "@shared/utils";
import { useSelector } from "react-redux";

export const OpeningHour = ({
    businessHour,
    translate
}) => {

    const language = useSelector(state => state.dataLocal.language);

    return (
        <View style={styles.container}>
            <Title text={translate("Opening hour")} onEdit={() => { NavigationService.navigate("OpeningHourEdit") }} />
            {
                businessHour && Object.entries(businessHour).map((obj, index) => {
                    if (obj[1]?.isCheck) {
                        return (
                            <View key={obj[0] + "businessHour"} style={styles.row}>
                                <Text style={styles.txt}>{translateManual(language,obj[0])}</Text>
                                <Text style={styles.txt}>
                                    {`${Object.values(businessHour)[index].timeStart} - ${Object.values(businessHour)[index].timeEnd}`}
                                </Text>
                            </View>
                        )
                    } else return null;
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
        marginVertical: scaleHeight(8)
    },
    txt: {
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR,
        color: "#404040"
    }
});
