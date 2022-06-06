import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "@shared/components";
import Modal from "react-native-modal";
import { translate } from "@localize";

export const LanguageLoading = React.forwardRef(
    ({
        title = "",
        titleContent = "",
        onModalHide = () => { },
    }, ref) => {

        const [open, setOpen] = React.useState(false);
        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleNOButtonPress = () => {
            hideModal();
            if (onConfirmNo && typeof onConfirmNo === "function") {
                onConfirmNo();
            }
        };

        const onHandleYESButtonPress = () => {
            hideModal();
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
            }
        };

        React.useImperativeHandle(ref, () => ({
            hide: () => {
                setOpen(false);
            },
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
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <Text style={styles.titleContent}>
                        {titleContent}
                    </Text>

                    <View style={styles.bottomStyle}>
                        <ActivityIndicator
                            size='large'
                            color={'#2B62AB'}
                            style={{ marginBottom : 24 }}
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
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        position: 'relative',
        zIndex: 99999999
    },


    modal: {
        margin: 0,
        padding: 0
    },

    txtTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(21),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
        color: colors.WHITE,
    },

    titleContent: {
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(20),
        fontSize: scaleFont(16),
        marginHorizontal: scaleWidth(16),
        letterSpacing: 0,
        textAlign: "center",
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scaleHeight(20)
    },

    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: scaleHeight(12)
    },
});
