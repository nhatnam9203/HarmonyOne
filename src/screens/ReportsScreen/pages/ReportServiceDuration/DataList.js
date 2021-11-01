import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { fonts, colors, images } from "@shared/themes";
import { app, invoice } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import { CustomTable } from "@shared/components";
import { getCredicardIcon } from "@shared/utils";
import moment from "moment";
import NavigationService from '@navigation/NavigationService';


export const DataList = ({
    data = [],
    onLoadMore = () => { },
    onRefresh = () => { },
    isRefresh,
    endLoadMore,
    onRowPress
}) => {

    const onPress = ({item, row}) =>{
        onRowPress(item?.staffId);
        // NavigationService.navigate(screenNames.ServiceDurationStatistic);
        // staff/report/serviceduration/detail/452?timeStart=10/21/2021&timeEnd=10/31/2021&quickFilter=custom
    }

    const renderCell = ({ key, row, column, item }) => {
        const data = item[key];
        switch (key) {
            case "name":
                return <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR }]}>
                    {item?.name}
                </Text>
            case "differenceDuration":
                return (
                    <Text style={[styles.txtDate, { fontFamily: fonts.REGULAR, textAlign: 'right' }]}>
                        {item?.differenceDuration}
                    </Text>
                )
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
                name: "Staff name",
                differenceDuration: "Duration difference",
            }}
            whiteKeys={[
                "name",
                "differenceDuration"
            ]}
            primaryId="staffId"
            sumTotalKey="name"
            calcSumKeys={[

            ]}
            priceKeys={[
            ]}

            sumTotalKey={"name"}
            heightSection={50}
            isRenderSection={true}

            headStyle={{ color: colors.ocean_blue, fontSize: scaleFont(15), textAlign: 'right' }}
            unitKeys={{ salary: "", }}
            arrTextTotal={["differenceDuration"]}
            maxColumnCount={3}
            sortDefault="NONE"
            sortKey="name"
            tableCellWidth={{ name: scaleWidth(375 / 2 - 50), differenceDuration: scaleWidth(237.5) }}
            renderCell={renderCell}
            renderActionCell={() => null}
            isRefreshing={isRefresh}
            onRefresh={onRefresh}
            onLoadMore={onLoadMore}
            onRowPress={onPress}
            endLoadMore={() => { }}
            maxColumnCount={2}
            styleFirstCell={styles.firstCell}
            styleFirstSection={[styles.firstCell,{ backgroundColor: '#fafafa' }]}
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
    firstCell : {
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

