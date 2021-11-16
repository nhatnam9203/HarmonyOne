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
            case "SettlementId":
                return <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                    #{data}
                </Text>
            case "createdDate":
                return (
                    <View>
                        <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, fontSize : scaleFont(13) }]}>
                            {moment(item?.createdDate).format("MM/DD/YYYY")}
                        </Text>
                        <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT, fontSize : scaleFont(13) }]}>
                            {moment(item?.createdDate).format("hh:mm A")}
                        </Text>
                    </View>
                )
            case "checkoutId":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        #{item?.checkoutId}
                    </Text>
                )
            case "status":
                return <Text style={[styles.txt, { fontFamily: fonts.REGULAR, color: "#404040" , fontSize : scaleFont(13)}]}>
                    {item?.status}
                </Text>
            case "payment":
                return item?.paymentData?.card_number ? (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            style={styles.iconCard}
                            source={getCredicardIcon(item?.paymentData?.card_type)}
                            resizeMode='contain'
                        />
                        <Text style={[styles.txt, { fontFamily: fonts.LIGHT, marginLeft : 4}]}>
                            x {item?.paymentData?.card_number}
                        </Text>
                    </View>
                ) : <View />;

            case "amount":
                return <Text style={[styles.txt, { fontFamily: fonts.MEDIUM, color: "#000" }]}>
                    $ {item?.amount}
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
                SettlementId: "Trans ID",
                createdDate: "Date/time",
                checkoutId: "Invoice",
                status: "Status",
                payment: "Payments",
                amount: "Total",
            }}
            whiteKeys={[
                "SettlementId",
                "createdDate",
                "checkoutId",
                "status",
                "payment",
                "amount"
            ]}
            primaryId="SettlementId"
            sumTotalKey="amount"
            calcSumKeys={[

            ]}
            priceKeys={[
                "amount",
            ]}
            unitKeys={{ workingHour: "hrs" }}
            sortDefault="NONE"
            sortKey="code"
            tableCellWidth={{}}
            renderCell={renderCell}
            renderActionCell={() => null}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
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
        fontSize: scaleFont(14),
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

