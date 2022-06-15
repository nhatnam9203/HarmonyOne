import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { fonts, colors, images } from "@shared/themes";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { getCredicardIcon } from "@shared/utils";
import moment from "moment";
import { translate } from "@localize";


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
            case "createdDate":
                return (
                    <Text style={[styles.txt, { fontFamily: fonts.REGULAR }]}>
                        {item?.dateString}
                    </Text>
                )
            case "name":
                return <Text style={[styles.txt, { fontFamily: fonts.LIGHT }]}>
                    {item?.name}
                </Text>
            case "price":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        $ {item?.price}
                    </Text>
                )
            case "quantity":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        {item?.quantity}
                    </Text>
                )

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
                createdDate: translate("Date/time"),
                name: translate("Type"),
                price: translate("Value"),
                quantity: translate("Qty"),
                total: translate("Total sales"),
            }}
            whiteKeys={[
                "createdDate",
                "name",
                "price",
                "quantity",
                "total"
            ]}
            primaryId="name"
            sumTotalKey="createdDate"
            tableCellWidth={{ createdDate: scaleWidth(130) }}
            priceKeys={[
                "price",
                "total"
            ]}

            calcSumKeys={[
                "quantity",
                "total"
            ]}
            heightSection={50}
            unitKeys={{ total: "", }}
            isRenderSection={true}
            sortDefault="NONE"
            renderCell={renderCell}
            sortKey="createdDate"
            tableCellWidth={{}}
            renderActionCell={() => null}
            isRefreshing={false}
            onRefresh={() => { }}
            onLoadMore={() => { }}
            endLoadMore={() => { }}
            maxColumnCount={3}
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
        fontSize: scaleFont(13),
        fontFamily: fonts.REGULAR,
        color: "#404040"
    },
    txtDate: {
        fontSize: scaleFont(13),
        fontFamily: fonts.LIGHT,
        color: "#404040"
    },
    usercreatedDate: {
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
