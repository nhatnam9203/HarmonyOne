import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { Slider } from "./widget";

const MarketingMessageNumber = ({
    form,
    errors,
    smsMaxCustomer,
    smsMaxAmount,
    smsAmount,
    customerSendSMSQuantity,
    valueSlider,
    hanldeSliderValue,
}) => {

    const [discount_type, setDiscountType] = React.useState("money");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Number of message</Text>
            <View style={styles.row}>
                <Text style={styles.txtItem}>0</Text>
                <Text style={styles.txtItem}>{smsMaxCustomer}</Text>
            </View>
            <Slider
                value={valueSlider}
                onValueChange={(text) => hanldeSliderValue(text)}
                trackStyle={{
                    height: scaleWidth(10),
                    backgroundColor: "#F1F1F1",
                    borderRadius: scaleWidth(6),
                }}
                thumbStyle={{
                    height: scaleWidth(24),
                    width: scaleWidth(24),
                    borderRadius: scaleWidth(12),
                    backgroundColor: "#fff",
                    ...Platform.select({
                        ios: {
                            shadowColor: "rgba(0, 0, 0,0.3)",
                            shadowOffset: { width: 1, height: 0 },
                            shadowOpacity: 1,
                        },

                        android: {
                            elevation: 2,
                        },
                    }),
                }}
                minimumTrackTintColor="#0764B0"
                smsCount={customerSendSMSQuantity}
                smsMaxCount={smsMaxCustomer}
                smsMoney={smsAmount}
                smsMaxMoney={smsMaxAmount}
            />
            <View style={styles.row}>
                <Text style={[styles.txtItem,{ fontFamily : fonts.MEDIUM }]}>{"$ 0.00"}</Text>
                <Text style={[styles.txtItem,{ fontFamily : fonts.MEDIUM }]}>{`$ ${smsMaxAmount}`}</Text>
            </View>
        </View>
    )
};
export default MarketingMessageNumber;


const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(32),
        marginBottom: scaleHeight(32),
        marginLeft : -scaleWidth(16),
        marginRight :  -scaleWidth(16),
        paddingHorizontal : scaleWidth(16),
    },
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    txtItem: {
        fontSize: scaleFont(15),
        fontFamily: fonts.LIGHT,
    },
    title: {
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        marginBottom: scaleHeight(24),
        color: "#404040"
    }
});
