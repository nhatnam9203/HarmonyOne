import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import NavigationService from '@navigation/NavigationService';
import {
    getPromotionAppointment,
    useAxiosQuery,
} from "@src/apis";
import { useDispatch } from "react-redux";
import { appointment } from "@redux/slices";
import { isEmpty } from "lodash";


export const TotalView = ({
    groupAppointments
}) => {

    const appointmentDetail = !isEmpty(groupAppointments) ? groupAppointments?.appointments[0] : {};
    const dispatch = useDispatch();

    const [, fetchPromotionAppointment] = useAxiosQuery({
        ...getPromotionAppointment(appointmentDetail?.appointmentId),
        enabled: false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setPromotionAppointment(data));
                NavigationService.navigate(screenNames.ApplyDiscountPage);
            }
        }
    });


    const addTip = () => {
        NavigationService.navigate(screenNames.AddTipPage);
    }

    const addDiscount = () => {
        fetchPromotionAppointment();
    }

    const discount = appointmentDetail?.discount ?? "0.00";
    const tipAmount = appointmentDetail?.tipAmount ?? "0.00";

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{`$ ${appointmentDetail?.subTotal}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Discount</Text>
                {
                    parseFloat(discount) > 0 ?
                        <TouchableOpacity
                            onPress={addDiscount}
                            style={{ flexDirection: "row", alignItems: "center" }}
                        >
                            <Text style={[styles.text, { marginRight: 5 }]}>
                                {`$ ${discount}`}
                            </Text>
                            <Image
                                source={images.iconArrow}
                                resizeMode='contain'
                                style={styles.iconArrow}
                            />
                        </TouchableOpacity>
                        :
                        <IconButton
                            icon={images.plus}
                            iconStyle={styles.iconAdd}
                            onPress={addDiscount}
                        />
                }
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Tip</Text>
                {
                    parseFloat(tipAmount) > 0 ?
                        <TouchableOpacity
                            onPress={addTip}
                            style={{ flexDirection: "row", alignItems: "center" }}
                        >
                            <Text style={[styles.text, { marginRight: 5 }]}>
                                {`$ ${tipAmount}`}
                            </Text>
                            <Image
                                source={images.iconArrow}
                                resizeMode='contain'
                                style={styles.iconArrow}
                            />
                        </TouchableOpacity>
                        :
                        <IconButton
                            icon={images.plus}
                            iconStyle={styles.iconAdd}
                            onPress={addTip}
                        />
                }
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Tax</Text>
                <Text style={styles.text}>{`$ ${appointmentDetail?.tax}`}</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.row}>
                <Text style={[styles.text, { fontFamily: fonts.BOLD }]}>Total</Text>
                <Text style={[styles.text, { fontFamily: fonts.BOLD, color: "#4AD100" }]}>
                    {`$ ${appointmentDetail?.total}`}
                </Text>
            </View>

            <View style={styles.line} />

            {
                groupAppointments?.checkoutPayments && groupAppointments?.checkoutPayments?.length > 0 &&
                groupAppointments?.checkoutPayments?.map(item => (
                    <View key={item?.checkoutPaymentId + "checkoutPaymentId"} style={styles.row}>
                        <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                            Paid
                            <Text style={{ fontFamily: fonts.REGULAR }}>{` (${item?.paymentMethod})`}</Text>
                        </Text>
                        <Text style={[styles.text, { fontFamily: fonts.MEDIUM }]}>
                            {`$ ${item.amount}`}
                        </Text>
                    </View>
                ))
            }

            <View style={styles.row}>
                <Text style={[styles.text, { fontFamily: fonts.BOLD, color: "red" }]}>Amount Due</Text>
                <Text style={[styles.text, { fontFamily: fonts.BOLD, color: "red" }]}>
                    {`$ ${groupAppointments?.dueAmount}`}
                </Text>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(16),
        paddingHorizontal: scaleWidth(16),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: scaleHeight(8)
    },
    iconAdd: {
        width: scaleWidth(20),
        height: scaleWidth(20),
    },
    text: {
        fontSize: scaleFont(17),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: "#eeeeee",
        marginVertical: scaleHeight(8)
    },
    iconArrow: {
        width: scaleWidth(10),
        height: scaleWidth(10),
    }
});