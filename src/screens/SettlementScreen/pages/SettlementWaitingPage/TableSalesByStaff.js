import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors, images } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";
import { app, invoice, settlement } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { guid } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";

export const TableSalesByStaff = ({
    data = [],
}) => {

    const viewStaffIncomeDetail = (staff) => {
        NavigationService.navigate(screenNames.StaffIncomeDetailPage, { staffDetail: staff });
    }

    return (
        <ScrollView bounces={false} showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{ paddingHorizontal: scaleWidth(16) }} >
                <View style={styles.tableHead}>
                    <Text style={[styles.txtTitle, { width: scaleWidth(120) }]}>Staff name</Text>
                    <Text style={[styles.txtTitle, { width: scaleWidth(100) }]}>Sales</Text>
                    <Text style={[styles.txtTitle, { width: scaleWidth(70) }]}>Tax</Text>
                    <Text style={[styles.txtTitle, { width: scaleWidth(70) }]}>Tip</Text>
                    <Text style={[styles.txtTitle, { width: scaleWidth(83), textAlign: "right" }]}>Total sales</Text>
                </View>
                {
                    data.map((obj) => (
                        <TouchableOpacity onPress={() => viewStaffIncomeDetail(obj)} key={guid() + "staffSales"} style={styles.tableRow}>
                            <Text style={[styles.txtTitle, { width: scaleWidth(120) }]}>{obj?.name}</Text>
                            <Text style={[styles.txtTitle, { width: scaleWidth(100), fontFamily: fonts.LIGHT }]}>$ {obj.sales}</Text>
                            <Text style={[styles.txtTitle, { width: scaleWidth(70), fontFamily: fonts.LIGHT }]}>$ {obj.tax}</Text>
                            <Text style={[styles.txtTitle, { width: scaleWidth(70), fontFamily: fonts.LIGHT }]}>$ {obj.tip}</Text>
                            <Text style={[styles.txtTitle, { width: scaleWidth(83), textAlign: "right" }]}>$ {obj.total}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom: scaleHeight(10),
        marginTop: scaleHeight(10)
    },
    tableHead: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom: scaleHeight(12)
    },
    txtTitle: {
        fontSize: scaleFont(14),
        color: "#404040",
        fontFamily: fonts.MEDIUM
    },
})

