import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { fonts, colors, images } from "@shared/themes";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { getCredicardIcon } from "@shared/utils";
import moment from "moment";
import NavigationService from "@navigation/NavigationService";
import { translate } from "@localize";


export const DataList = ({
    data = [],
    onRefresh = () => { },
    isRefresh,
    endLoadMore,
    timeStart,
    timeEnd
}) => {

    const onRowPress = ({ item }) => {
        NavigationService.navigate(screenNames.ProductStatistic, { item, timeStart, timeEnd });
    }

    const renderCell = ({ key, row, column, item }) => {
        return (
            <TouchableOpacity onPress={() => onRowPress({ item })}>
                {renderItem(key, row, column, item)}
            </TouchableOpacity>
        )
    };


    const renderItem = (key, row, column, item) => {
        const data = item[key];
        switch (key) {
            case "name":
                return <Text style={[styles.txtDate, { fontFamily: fonts.MEDIUM, textAlign: "left" }]}>
                    {item?.name}
                </Text>

            case "stockOnHand":
                return <Text style={[styles.txtDate, { fontFamily: fonts.MEDIUM, textAlign: "left" }]}>
                    {item?.stockOnHand}
                </Text>

            case "quantity":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'right' }]}>
                        {item?.quantity}
                    </Text>
                );
            case "avgPrice":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'right' }]}>
                        $ {item?.avgPrice}
                    </Text>
                );
            case "totalSales":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.BOLD, textAlign: 'right' }]}>
                        $ {item?.totalSales}
                    </Text>
                );
            default:
                return <Text style={styles.txt}>
                    $ {data}
                </Text>
        }
    }

    return (
        <CustomTable
            tableData={data}
            tableHead={{
                name: translate("Product"),
                stockOnHand: translate("Stock on hand"),
                quantity: translate("Qty sold"),
                avgPrice: translate("Av Price"),
                totalSales: translate("Total Sales")
            }}
            whiteKeys={[
                "name",
                "stockOnHand",
                "quantity",
                "avgPrice",
                "totalSales"
            ]}
            primaryId="categoryId"
            sumTotalKey="name"
            calcSumKeys={[
                "stockOnHand",
                "quantity",
                "avgPrice",
                "totalSales"
            ]}
            priceKeys={[
                "totalSales",
                "avgPrice",
            ]}

            sumTotalKey={"name"}
            heightSection={50}
            isRenderSection={true}

            headStyle={{ color: colors.ocean_blue, fontSize: scaleFont(15), textAlign: 'left' }}
            unitKeys={{ totalHour: "hrs" }}
            arrTextTotal={["name"]}
            maxColumnCount={3}
            sortDefault="NONE"
            sortKey="name"
            tableCellWidth={{ stockOnHand: scaleWidth(140) }}
            renderCell={renderCell}
            renderActionCell={() => null}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={() => { }}
            endLoadMore={() => { }}
            maxColumnCount={3}
            styleFirstCell={styles.firstCell}
            styleFirstSection={[styles.firstCell, { backgroundColor: '#fafafa' }]}
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
        fontSize: scaleFont(14),
        fontFamily: fonts.LIGHT,
        color: "#404040"
    },
    userName: {
        fontSize: scaleFont(14),
        fontFamily: fonts.MEDIUM,
        color: colors.ocean_blue
    },
    firstCell: {
        shadowColor: "#C5C5C5",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.24,

        elevation: 5,
        backgroundColor: 'white'
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

