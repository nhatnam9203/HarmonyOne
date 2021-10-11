import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button, IconButton } from "@shared/components";
import Modal from "react-native-modal";
import CheckBox from "@react-native-community/checkbox";
import { Dialog } from "react-native-paper";

const DiaglogExportProduct = React.forwardRef(
    ({
        onConfirmYes = () => { },
        title = "",
        titleContent = "",
        onModalHide = () => { },
        setNeedToOrder,
        isNeedToOrder,
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleNOButtonPress = () => {
            hideModal();
        };

        const onHandleYESButtonPress = () => {
            hideModal();
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
                hideModal();
            }
        };


        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
            },
        }));

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View style={styles.container}>
                    <IconButton
                        icon={images.iconClose}
                        style={styles.buttonClose}
                        iconStyle={styles.iconButtonClose}
                        onPress={hideModal}
                    />
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <CheckBox
                                disabled={false}
                                value={isNeedToOrder}
                                onValueChange={()=>setNeedToOrder(true)}
                                boxType='square'
                                style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                            />
                            <Text style={styles.txtContent}>
                                The products need to order more
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <CheckBox
                                disabled={false}
                                value={!isNeedToOrder}
                                onValueChange={()=>setNeedToOrder(false)}
                                boxType='square'
                                style={{ width: 24, height: 24, marginRight: scaleWidth(16) }}
                            />
                            <Text style={styles.txtContent}>
                                All product
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bottomStyle}>
                        <Button
                            onPress={onHandleYESButtonPress}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={scaleWidth(169)}
                            label="Yes"
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                            styleText={{ color: "red" }}
                        />
                        <View style={styles.line} />
                        <Button
                            onPress={hideModal}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={scaleWidth(169)}
                            label="No"
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
);

export default DiaglogExportProduct;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignSelf: "center",
        width: scaleWidth(340),
        paddingTop: scaleWidth(20),
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

    content: {
        paddingTop: scaleHeight(20),
        marginTop: scaleHeight(16),
        borderTopWidth: 1,
        borderTopColor : "#dddddd",
        paddingLeft: scaleWidth(20)
    },
    txtContent: {
        fontSize: scaleFont(16),
        color : "#404040",
        fontFamily: fonts.MEDIUM
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom : scaleHeight(16)
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(19),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
        color: colors.WHITE,
    },

    buttonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        borderRadius: scaleWidth(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginRight: scaleWidth(10),
        position: 'absolute',
        right: scaleWidth(2),
        top: scaleWidth(12),
    },

    iconButtonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        tintColor: "#404040",
    },

    titleContent: {
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20),
        fontSize: scaleFont(15),
        marginHorizontal: scaleWidth(16),
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        marginTop: scaleHeight(20)
    },
    line: {
        height: scaleHeight(48),
        width: scaleWidth(2),
        backgroundColor: "#dddddd"
    }
});
