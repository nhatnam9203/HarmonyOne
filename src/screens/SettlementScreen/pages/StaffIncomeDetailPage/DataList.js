import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { fonts, colors, images } from "@shared/themes";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { getCredicardIcon } from "@shared/utils";
import moment from "moment";


export const DataList = ({
    data = [],
    onLoadMore = () => { },
    onRefresh = () => { },
    isRefresh,
    endLoadMore,
}) => {


    const renderCell = ({ key, row, column, item }) => {
        const data = item[key];
        switch (key) {
            case "name":
                return (
                    <Text style={[styles.txt, { fontFamily: fonts.MEDIUM, color: "#000" }]}>
                        {item?.name}
                    </Text>
                )
            case "appointmentCode":
                return <Text style={[styles.txt, { fontFamily: fonts.LIGHT }]}>
                    #{item?.appointmentCode}
                </Text>
            case "date":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        {moment(item?.date).format("hh:mm A")}
                    </Text>
                )
            case "sales":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        $ {item?.sales}
                    </Text>
                )
            case "tax":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#404040" }]}>
                    $ {item?.tax}
                </Text>
            case "tip":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#404040" }]}>
                    $ {item?.tip}
                </Text>

            case "total":
                return <Text style={[styles.txt, { fontFamily: fonts.MEDIUM, color: "#000" }]}>
                    $ {item?.total}
                </Text>
            default:
                return <Text style={styles.txt}>
                    $ {data}
                </Text>
        }

    };

    return (
        <CustomTable
            tableData={data}
            tableHead={{
                name: "Service/Product",
                appointmentCode: "Appointmet Id",
                date: "Time",
                sales: "Sales",
                tax: "Tax",
                tip: "Tip",
                total: "Total sales",
            }}
            whiteKeys={[
                "name",
                "appointmentCode",
                "date",
                "sales",
                "tax",
                "tip",
                "total"
            ]}
            primaryId="appointmentCode"
            sumTotalKey="name"
            tableCellWidth={{
                name: 270,
            }}
            priceKeys={[
                "tax",
                "tip",
                "total"
            ]}

            calcSumKeys={[  
                "tax",
                "tip",
                "total"
            ]}
            heightSection={65}
            unitKeys={{ total: "", }}
            isRenderSection={true}
            sortDefault="NONE"
            renderCell={renderCell}
            sortKey="name"
            tableCellWidth={{ appointmentCode : scaleWidth(150), total : scaleWidth(140), name : scaleWidth(150) }}
            renderActionCell={() => null}
            isRefreshing={false}
            onRefresh={() => { }}
            onLoadMore={() => { }}
            endLoadMore={() => { }}
            maxColumnCount={4}
        />
    )
}

const styles = StyleSheet.create({
    iconCard: {
        width: scaleWidth(30),
        height: scaleWidth(25),
    },
    cell: {

    },
    txt: {
        fontSize: scaleFont(14),
        fontFamily: fonts.REGULAR,
        color: "#404040"
    },
    txtDate: {
        fontSize: scaleFont(13),
        fontFamily: fonts.LIGHT,
        color: "#404040"
    },
    userName: {
        fontSize: scaleFont(14),
        fontFamily: fonts.MEDIUM,
        color: colors.ocean_blue
    },
    circleStatus: status => {

        let backgroundColor = "#404040";

        switch (status) {
            case "incomplete":
                backgroundColor = colors.ocean_blue
                break;
            case "pending":
                color = colors.ocean_blue
                break;
            case "complete":
                backgroundColor = "#19A9EC";
                break;
            case "paid":
                backgroundColor = "#4AD100";
                break;
            case "void":
                backgroundColor = "#CCCCCC";
                break;
            case "refund":
                backgroundColor = "#CCCCCC";
                break;


            default:
                break;
        }

        return {
            width: scaleWidth(12),
            height: scaleWidth(12),
            borderRadius: 3000,
            backgroundColor,
            marginRight: 5
        }
    },
    txtStatus: status => {
        let color = "#404040";

        switch (status) {
            case "incomplete":
                color = colors.ocean_blue
                break;
            case "pending":
                color = colors.ocean_blue
                break;
            case "complete":
                color = "#19A9EC";
                break;
            case "paid":
                color = "#4AD100";
                break;
            case "void":
                color = "#CCCCCC";
                break;
            case "refund":
                color = "#CCCCCC";
                break;


            default:
                break;
        }

        return {
            color,
            fontSize: scaleFont(14),
            fontFamily: fonts.REGULAR
        }
    }
})

