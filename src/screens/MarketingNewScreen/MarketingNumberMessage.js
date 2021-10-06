import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { Slider } from "./widget";

const MarketingMessageNumber = ({
    form,
    errors,
}) => {

    const [discount_type, setDiscountType] = React.useState("money");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Number of message</Text>
            <View style={styles.row}>
                <Text style={styles.txtItem}>0</Text>
                <Text style={styles.txtItem}>150</Text>
            </View>
            <Slider
                value={0}
                onValueChange={() => { }}
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
                smsCount={"0"}
                smsMaxCount={179 || 1}
                smsMoney={"0.00"}
                smsMaxMoney={"7.16"}
            />
            <View style={styles.row}>
                <Text style={styles.txtItem}>{"$0.00"}</Text>
                <Text style={styles.txtItem}>{"$150.00"}</Text>
            </View>
        </View>
    )
};
export default MarketingMessageNumber;


const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(32),
        marginBottom: scaleHeight(32)
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
        marginBottom: scaleHeight(16),
        color: "#404040"
    }
});
