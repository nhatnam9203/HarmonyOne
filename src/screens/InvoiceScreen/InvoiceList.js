import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors, images } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const InvoiceList = ({
    data = [],
    onLoadMore = () => { },
    onRefresh = () => { },
    isRefresh
}) => {
    const dispatch = useDispatch();
    const { staff: { staffListByMerchant = [] } } = useSelector(state => state);
    const [t] = useTranslation();

    const onRowPress = ({ key, row, column, item }) => {
        getInvoiceDetail(item?.checkoutId);
    };

    const getInvoiceDetail = async (checkoutId) => {
        dispatch(app.showLoading());
        const params = {
            url: `checkout/${checkoutId}`,
            method: 'GET',
        }

        try {
            const response = await axios(params);
            if (response?.data?.codeNumber == 200) {
                dispatch(invoice.setInvoiceDetail(response?.data?.data));
                NavigationService.navigate(screenNames.InvoiceDetailScreen);
            }

        } catch (err) {

        } finally {
            dispatch(app.hideLoading());
        }
    }

    const renderCell = ({ key, row, column, item }) => {
        const data = item[key];

        return (
            <TouchableOpacity onPress={() => getInvoiceDetail(item?.checkoutId)}>
                {renderItem(key, data, item)}
            </TouchableOpacity>
        )

    };

    const renderItem = (key, data, item) => {
        switch (key) {
            case "checkoutId":
                return <Text style={styles.txt}>
                    # {data}
                </Text>
            case "createdDate":
                return (
                    <View>
                        <Text style={styles.txtDate}>
                            {moment(data).format("hh:mm A")}
                        </Text>
                        <Text style={[styles.txtDate, { marginTop: 3 }]}>
                            {moment(data).format("DD MMM")}
                        </Text>
                    </View>
                )
            case "status":
                return (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.circleStatus(data)} />
                        <Text style={styles.txtStatus(data)}>{data}</Text>
                    </View>
                )
            case "total":
                return <Text style={[styles.txt,{ fontFamily : fonts.MEDIUM }]}>
                    $ {data}
                </Text>
            case "user":
                return (
                    <View>
                        <Text style={styles.userName}>
                            {`${data?.firstName} ${data?.lastName}`}
                        </Text>
                        <Text style={[styles.userName,{ color : "#404040", fontFamily : fonts.REGULAR, marginTop : 3 }]}>
                            {`# ${item?.code}`}
                        </Text>
                    </View>
                )
            default:
                const staff = staffListByMerchant.find(s => s.staffId == data);
                return <Text style={styles.txt}>
                    {`${staff?.displayName}`}
                </Text>
        }
    }

    return (
        <CustomTable
            tableData={data}
            tableHead={{
                checkoutId: "Invoice ID",
                user: "Customer",
                status: "Status",
                createdDate: "Date/time",
                createdById: "Created by",
                total: "Total sales",
            }}
            whiteKeys={[
                "checkoutId",
                "user",
                "status",
                "createdDate",
                "createdById",
                "total",
            ]}
            primaryId="checkoutId"
            sumTotalKey="checkoutId"
            calcSumKeys={[

            ]}
            priceKeys={[
                "total",
            ]}
            unitKeys={{ workingHour: "hrs" }}
            sortDefault="NONE"
            sortKey="checkoutId"
            tableCellWidth={{ user: scaleWidth(180) }}
            renderCell={renderCell}
            renderActionCell={() => null}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
            endLoadMore={() => { }}
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
            fontFamily: fonts.MEDIUM
        }
    }
})

