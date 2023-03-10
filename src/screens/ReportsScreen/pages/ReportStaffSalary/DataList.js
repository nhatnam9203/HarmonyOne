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
    roleName,
    staff,
}) => {

    const getData = () => {
        if (roleName == "manager" || roleName == "admin") {
            return data;
        } else {
            return data.filter(obj => obj?.staffId == staff?.staffId);
        }
    }

    const renderCell = ({ key, row, column, item }) => {
        const data = item[key];
        switch (key) {
            case "name":
                return <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                    {item?.name}
                </Text>
            case "serviceSales":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                        $ {item?.serviceSales}
                    </Text>
                )
            case "surcharge":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                        $ {item?.surcharge}
                    </Text>
                )
            case "netServiceSales":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#404040" }]}>
                    $ {item?.netServiceSales}
                </Text>

            case "serviceSplit":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.serviceSplit}
                </Text>

            case "productSales":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.productSales}
                </Text>
            case "productSplit":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.productSplit}
                </Text>
            case "tip":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.tip}
                </Text>
            case "discountByStaff":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.discountByStaff}
                </Text>
            case "refundAmount":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#000" }]}>
                    $ {item?.refundAmount}
                </Text>
            case "salary":
                return <Text style={[styles.txt, { fontFamily: fonts.MEDIUM, color: "#000" }]}>
                    $ {item?.salary}
                </Text>
            default:
                return <Text style={styles.txt}>
                    $ {data}
                </Text>
        }

    };

    return (
        <CustomTable
            tableData={getData()}
            tableHead={{
                name: translate("Staff name"),
                serviceSales: translate("Service sales"),
                surcharge: translate("Surcharge"),
                netServiceSales: translate("Net service sales"),
                serviceSplit: translate("Service split"),
                productSales: translate("Product sales"),
                productSplit: translate("Product split"),
                tip: translate("Tip amount"),
                discountByStaff: translate("Discount by staff"),
                refundAmount: translate("Refund amount"),
                salary: translate("Salary")
            }}
            whiteKeys={[
                "name",
                "serviceSales",
                "surcharge",
                "netServiceSales",
                "serviceSplit",
                "productSales",
                "productSplit",
                "tip",
                "discountByStaff",
                "refundAmount",
                "salary"
            ]}
            primaryId="staffId"
            sumTotalKey="name"
            calcSumKeys={[
                "serviceSales",
                "surcharge",
                "netServiceSales",
                "serviceSplit",
                "productSales",
                "productSplit",
                "tip",
                "discountByStaff",
                "refundAmount",
                "salary"
            ]}
            priceKeys={[
                "serviceSales",
                "surcharge",
                "netServiceSales",
                "serviceSplit",
                "productSales",
                "productSplit",
                "tip",
                "discountByStaff",
                "refundAmount",
                "salary"
            ]}

            sumTotalKey="name"
            heightSection={50}
            isRenderSection={true}

            headStyle={{ color: colors.ocean_blue, fontSize: scaleFont(15) }}
            unitKeys={{ salary: "", }}
            maxColumnCount={3}
            sortDefault="NONE"
            sortKey="name"
            tableCellWidth={{ discountByStaff: scaleWidth(150), netServiceSales: scaleWidth(150), refundAmount: scaleWidth(140) }}
            renderCell={renderCell}
            renderActionCell={() => null}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
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
        fontSize: scaleFont(14),
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

