import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import Modal from "react-native-modal";


export const DialogLoading = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onModalHide = () => { },
        title = "Appointment added successfully"
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(true);
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
            hide : () =>{
                setOpen(false);
            }
        }));

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal} 
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="fadeInRight"
                animationOut="fadeOutRight"
                backdropColor={'rgba(64,64,64,0.5)'}
            >
                <View style={styles.container}>
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <Image 
                        source={images.iconLoading}
                        style={styles.iconChecked}
                    />

                    <View style={styles.bottomStyle}>
                        <Button
                            onPress={onHandleYESButtonPress}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={scaleWidth(169 * 2)}
                            label="OK"
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(340),
        paddingTop: scaleWidth(20),
        borderRadius: scaleHeight(5),
        // shadowColor: "#004080bf",
        // shadowOffset: {
        //     width: 0,
        //     height: 0,
        // },
        // shadowRadius: 10,
        // shadowOpacity: 1,
        position: 'relative',
    },

    iconChecked : {
        width : scaleWidth(80),
        height : scaleWidth(80),
        tintColor : "#4AD100",
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
