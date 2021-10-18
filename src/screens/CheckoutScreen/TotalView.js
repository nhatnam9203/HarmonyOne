import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import NavigationService from '@navigation/NavigationService';
import {
    getGroupAppointmentById,
    getPromotionAppointment,
    useAxiosQuery,
} from "@src/apis";
import { useDispatch } from "react-redux";
import { appointment } from "@redux/slices";


export const TotalView = ({
    appointmentDetail
}) => {
    const dispatch = useDispatch();

    const [, fetchGroupApointmentById] = useAxiosQuery({
        ...getGroupAppointmentById(appointmentDetail?.appointmentId),
        enabled: false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setGroupAppointment(data));
                NavigationService.navigate(screenNames.ApplyDiscountPage);
            }
        }
    });

    const [, fetchPromotionAppointment] = useAxiosQuery({
        ...getPromotionAppointment(appointmentDetail?.appointmentId),
        enabled: false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(appointment.setPromotionAppointment(data));
            }
        }
    })


    const addTip = () => {
        NavigationService.navigate(screenNames.AddTipPage);
    }

    const addDiscount = () => {
        fetchGroupApointmentById();
        fetchPromotionAppointment();
    }


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{`$ ${appointmentDetail?.subTotal}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Tip</Text>
                <IconButton
                    icon={images.plus}
                    iconStyle={styles.iconAdd}
                    onPress={addTip}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.text}>Discount</Text>
                <IconButton
                    icon={images.plus}
                    iconStyle={styles.iconAdd}
                    onPress={addDiscount}
                />
            </View>

            <View style={styles.line} />

            <View style={styles.row}>
                <Text style={[styles.text, { fontFamily: fonts.BOLD }]}>Total</Text>
                <Text style={[styles.text, { fontFamily: fonts.BOLD, color: "#4AD100" }]}>{`$ ${appointmentDetail?.total}`}</Text>
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
        width: scaleWidth(18),
        height: scaleWidth(18),
        tintColor: "#0764B0"
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
    }
});