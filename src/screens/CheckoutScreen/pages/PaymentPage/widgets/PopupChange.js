import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { Button, IconButton } from "@shared/components";
import { isEmpty } from "lodash";
import Modal from "react-native-modal";

export const PopupChange = React.forwardRef(
    ({
        onOK = () => { },
        paymentDetail
    }, ref) => {

        const [open, setOpen] = React.useState(false);

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
            },

            hide: () => {
                setOpen(false);
            }
        }));

        const close = () => {
            setOpen(false);
        }

        const actionOk = () => {
            onOK();
            close();
        }

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={() => { }}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="zoomIn"
                animationOut="zoomOut"
                statusBarTranslucent={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>{`Confirmation`}</Text>
                    </View>
                    <View style={{ width: "100%", backgroundColor: "white", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>

                        <View style={[styles.row]}>
                            <Text style={[styles.txt]}>Change:</Text>
                            <Text style={[styles.txt, { fontFamily: fonts.MEDIUM, marginLeft: 8 }]}>
                                $ {paymentDetail?.checkoutPaymentResponse?.dueAmount?.toString()?.replace("-", "")}
                            </Text>
                        </View>

                        <View style={styles.bottomStyle}>
                            <TouchableOpacity
                                onPress={actionOk}
                                style={styles.buttonSubmit}
                            >

                                <Text style={styles.textSubmit}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    horizontalLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#dddddd",
        marginTop: scaleHeight(20)
    },
    txt: {
        fontSize: scaleFont(16),
        color: "#404040",
        fontFamily: fonts.REGULAR
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(17),
        paddingHorizontal: scaleWidth(20),
        position: 'relative'
    },
    line: {
        width: "100%",
        height: 5,
        backgroundColor: "#cccccc"
    },
    buttonSubmit: {
        height: scaleHeight(36),
        width: scaleWidth(120),
        backgroundColor: colors.ocean_blue,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textSubmit: {
        fontFamily: fonts.MEDIUM,
        color: colors.white,
        fontSize: scaleFont(17)
    },
    header: {
        width: "100%",
        height: scaleHeight(55),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1366AE",
        borderTopLeftRadius: scaleHeight(5),
        borderTopRightRadius: scaleHeight(5),
    },
    textHeader: {
        color: "white",
        fontSize: scaleFont(20),
        fontFamily: fonts.BOLD
    },
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(350),
        borderRadius: scaleHeight(5),
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        position: 'relative',
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        marginTop: scaleHeight(20),
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scaleHeight(28),
        marginBottom: scaleHeight(16),
    },
});
