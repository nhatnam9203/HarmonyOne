import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import Modal from "react-native-modal";
import CheckBox from "@react-native-community/checkbox";
import { translate } from "@localize";


export const PopupPayCompleted = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onConfirmNo = () => { },
        onModalHide = () => { },
        title = "Appointment added successfully"
    }, ref) => {
        const [t] = useTranslation();

        const [isSendLink, setSendLink] = React.useState(false);

        const [open, setOpen] = React.useState(false);
        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleNOButtonPress = () => {
            hideModal();
            if (onConfirmNo && typeof onConfirmNo === "function") {
                onConfirmNo();
                hideModal();
            }
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
            hide: () => {
                setOpen(false);
            },
            getStatusSendLink : () =>{
                return isSendLink;
            }
        }));

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn='zoomInUp'
                animationOut='zoomOutDown'
                backdropColor={'rgba(64,64,64,0.5)'}
            >
                <View style={styles.container}>
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <Image
                        source={images.checked_success}
                        style={styles.iconChecked}
                        resizeMode='contain'
                    />
                    <Text style={{ color: '#404040', fontSize: scaleFont(15), marginTop: scaleHeight(15) }}  >
                        {translate("Do you want to print receipt")}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: scaleHeight(16) }}>
                        <CheckBox
                            disabled={false}
                            value={isSendLink}
                            onValueChange={(newValue) => setSendLink(newValue)}
                            boxType='square'
                            style={{ width: scaleWidth(22), height: scaleWidth(18), marginRight: scaleWidth(8) }}
                        />
                        <Text style={styles.txtSendLink}>{translate("Send Google Review Link")}</Text>
                    </View>

                    <View style={styles.bottomStyle}>
                        <Button
                            onPress={onHandleYESButtonPress}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={"50%"}
                            label={translate("Yes")}
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                        />
                        <View style={{ height : "100%", width : 1, backgroundColor : "#dddddd" }} />
                         <Button
                            onPress={onHandleNOButtonPress}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={"50%"}
                            label={translate("No")}
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                            styleText={{
                                color : "red",
                                fontFamily : fonts.MEDIUM
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(340),
        paddingTop: scaleWidth(20),
        borderRadius: scaleHeight(5),
        position: 'relative',
    },

    txtSendLink: {
        color: "#585858",
        fontSize: scaleFont(15),
        fontFamily: fonts.REGULAR
    },

    iconChecked: {
        width: scaleWidth(43),
        height: scaleWidth(43),
        tintColor: "#4AD100",
        marginTop: scaleHeight(20)
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(17),
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
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        marginTop: scaleHeight(24)
    },
    line: {
        height: scaleHeight(48),
        width: scaleWidth(2),
        backgroundColor: "#dddddd"
    }
});
