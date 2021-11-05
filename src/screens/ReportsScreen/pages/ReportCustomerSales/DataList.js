import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { fonts, colors, images } from "@shared/themes";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { getCredicardIcon } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const DataList = ({
    data = [],
    onRefresh = () => { },
    isRefresh,
    endLoadMore,
}) => {

    const onRowPress = ({ item, row }) => {
        NavigationService.navigate(screenNames.CustomerStatistic, { item });
    }

    const renderCell = ({ key, row, column, item }) => {
        return (
            // <TouchableOpacity onPress={()=>onRowPress({ item, row })}>
            <View>
                {renderItem(key, row, column, item)}
            </View>
            // </TouchableOpacity>
        )
    };

    const renderItem = (key, row, column, item) => {
        const data = item[key];
        switch (key) {
            case "name":
                return <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: "left" }]}>
                    {item?.name}
                </Text>
            case "appointmentCount":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'center' }]}>
                        {item?.appointmentCount}
                    </Text>
                );
            case "lastVisitDate":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'left' }]}>
                        {moment(item?.lastVisitDate).format("MMM DD YYYY")}
                    </Text>
                );
            case "lastVisitSale":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'left' }]}>
                        $ {item?.lastVisitSale}
                    </Text>
                );
            case "total":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'right' }]}>
                        $ {item?.total}
                    </Text>
                )
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
                name: "Customer",
                appointmentCount: "Appointments",
                lastVisitDate: "Last visit",
                lastVisitSale: "Last visit sales",
                total: "Total sales",
            }}
            whiteKeys={[
                "name",
                "appointmentCount",
                "lastVisitDate",
                "lastVisitSale",
                "total"
            ]}
            primaryId="staffId"
            sumTotalKey="name"
            calcSumKeys={[
                "total",
                "lastVisitSale",
                "appointmentCount"
            ]}
            priceKeys={[
                "total",
                "lastVisitSale",
            ]}

            sumTotalKey={"name"}
            heightSection={50}
            isRenderSection={true}

            headStyle={{ color: colors.ocean_blue, fontSize: scaleFont(15), textAlign: 'left' }}
            unitKeys={{ type: "", }}
            arrTextTotal={["name"]}
            maxColumnCount={3}
            sortDefault="NONE"
            sortKey="name"
            onFirstCellPress={onRowPress}
            tableCellWidth={{ lastVisitSale: scaleWidth(150) }}
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

