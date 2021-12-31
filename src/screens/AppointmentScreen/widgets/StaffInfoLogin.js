import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { colors, fonts, layouts } from '@shared/themes';

import { isEmpty } from "lodash";
import { TouchableRipple } from "react-native-paper"
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { CustomImage } from "@shared/components";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { useSelector } from "react-redux";

const StaffInfoLgin = ({
    staffInfo
}) => {
    const blockTimes = useSelector(state => state.appointment.blockTimes) || [];
    const salaryStaffLogin = useSelector(state => state.staff.salaryStaffLogin);

    let money = formatNumberFromCurrency(salaryStaffLogin?.serviceSales) + formatNumberFromCurrency(salaryStaffLogin?.productSales);

    for (const appointment of blockTimes) {
        if (appointment?.staffId == staffInfo?.staffId) {
            const giftCards = appointment?.giftCards ?? [];
            for (const gift of giftCards) {
                money += formatNumberFromCurrency(gift?.price);
            }
        }
    }

    money = formatMoney(money);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <CustomImage
                    source={{ uri: staffInfo?.imageUrl }}
                    style={styles.avatar}
                />
                <View style={{ marginLeft: scaleWidth(8), paddingVertical: scaleWidth(4), width: scaleWidth(150) }}>
                    <Text style={styles.displayName}>{staffInfo?.displayName}</Text>
                    <Text style={styles.email}>{staffInfo?.phone}</Text>
                </View>
            </View>

            <View style={{ paddingTop: scaleWidth(4), alignItems: "flex-end" }}>
                {/* <Text style={styles.income}>Income</Text> */}
                <Text style={styles.amountIncome}>$ {money || "0.00"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: scaleWidth(16),
        backgroundColor: "white",
        shadowColor: Platform.OS == "ios" ? '#0000000D' : "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        elevation: 3,
    },
    avatar: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        borderRadius: 1000,
    },
    displayName: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        color: colors.ocean_blue
    },
    email: {
        fontSize: scaleFont(15),
        fontFamily: fonts.LIGHT,
        color: "#404040",
        marginTop: scaleWidth(5)
    },
    income: {
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: "#7a99ba"
    },
    amountIncome: {
        fontSize: scaleFont(17),
        fontFamily: fonts.BOLD,
        color: "#49d100",
        // marginTop : scaleWidth(5)

    }
});

export default StaffInfoLgin;