import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors, images } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";
import { app, invoice, settlement } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const DataList = ({
    data = [],
    onLoadMore = () => { },
    onRefresh = () => { },
    isRefresh,
    endLoadMore,
}) => {

    const [percent, setPercent] = React.useState(0);

    const dispatch = useDispatch();

    const onRowPress = ({ key, row, column, item }) => {
        getStaffSales(item);
        getGiftCardSales(item?.settlementId);
    };

    const getStaffSales = async (item) => {
        dispatch(app.showLoading());
        const params = {
            url: `appointment/staffSales/getBySettlement/${item?.settlementId}`,
            method: 'GET',
        }

        try {
            const response = await axios(params);
            if (response?.data?.codeNumber == 200) {
                dispatch(settlement.setStaffSales(response?.data?.data));
                NavigationService.navigate(screenNames.BatchHistoryDetailPage, { batchDetail: item });
            }

        } catch (err) {

        } finally {
            dispatch(app.hideLoading());
        }
    }

    const getGiftCardSales = async (settlementId) => {
        dispatch(app.showLoading());
        const params = {
            url: `settlement/giftCardSales/${settlementId}`,
            method: 'GET',
        }

        try {
            const response = await axios(params);

            if (response?.data?.codeNumber == 200) {
                dispatch(settlement.setGiftCardSales(response?.data?.data));
                // NavigationService.navigate(screenNames.InvoiceDetailScreen);
            }

        } catch (err) {

        } finally {
            dispatch(app.hideLoading());
        }
    }

    const renderCell = ({ key, row, column, item }) => {
        const data = item[key];
        switch (key) {
            case "settlementId":
                return <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                    #{data}
                </Text>
            case "date":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                        {moment(item?.settlementDate).format("MM/DD/YYYY")}
                    </Text>
                )
            case "time":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.LIGHT }]}>
                        {moment(item?.settlementDate).format("hh:mm A")}
                    </Text>
                )
            case "total":
                return <Text style={[styles.txt, { fontFamily: fonts.BOLD, color: "#404040" }]}>
                    $ {data}
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
                settlementId: "Batch ID",
                date: "Date",
                time: "Time",
                total: "Amount",
            }}
            whiteKeys={[
                "settlementId",
                "date",
                "time",
                "total",
            ]}
            primaryId="code"
            sumTotalKey="code"
            calcSumKeys={[

            ]}
            priceKeys={[
                "total",
            ]}
            unitKeys={{ workingHour: "hrs" }}
            sortDefault="NONE"
            sortKey="code"
            tableCellWidth={{}}
            renderCell={renderCell}
            renderActionCell={() => null}
            onRowPress={onRowPress}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
            endLoadMore={() => { }}
            maxColumnCount={4}
        />
    )
}

const styles = StyleSheet.create({
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

