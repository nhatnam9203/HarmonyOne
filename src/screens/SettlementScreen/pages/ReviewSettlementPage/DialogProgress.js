import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button, IconButton } from "@shared/components";
import { ProgressBar, Colors } from 'react-native-paper';
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { translate } from "@localize";

export const DialogProgress = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onModalHide = () => { },
        progress,
        viewBatch = () => { },
        finish = () => { },
    }, ref) => {
        const [t] = useTranslation();

        const {
            app: { appLoading }
        } = useSelector(state => state);

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
            hide: () => {
                setOpen(false);
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
                    {
                        progress == 100 ?
                            <Text style={[styles.txtTitle, { color: "#4AD100" }]}>
                                {translate('Batch Settlement SuccessFull')}
                            </Text> :
                            <Text style={styles.txtTitle}>
                                {translate('Batch Settlement in progress')}
                            </Text>
                    }

                    <Text style={styles.content}>
                        <ProgressBar
                            progress={(progress / 100)}
                            color={"#4AD100"}
                            visible={true}
                            style={{ height: 15, width: scaleWidth(300), marginTop: scaleHeight(30), borderRadius: 20 }}
                        />
                    </Text>


                    {progress == 100 && <View
                        pointerEvents={progress == 100 ? 'auto' : 'none'}
                        style={[styles.bottomStyle, { opacity: progress == 100 ? 1 : 0 }]}
                    >
                        <Button
                            onPress={viewBatch}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={scaleWidth(169)}
                            label={translate("View batch")}
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                        />
                        <View style={styles.line} />
                        <Button
                            onPress={finish}
                            highlight={false}
                            height={scaleHeight(48)}
                            width={scaleWidth(169)}
                            label={translate("Finish")}
                            styleButton={{
                                borderWidth: 0,
                                backgroundColor: "transparent"
                            }}
                        />
                    </View>}

                    {
                        appLoading && <View style={styles.containerLoading}>
                            <ActivityIndicator size='large' color={"green"} />
                        </View>
                    }
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
        height: scaleWidth(170),
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

    containerLoading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    modal: {
        margin: 0,
    },

    txtTitle: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(18),
        letterSpacing: 0,
        textAlign: "center",
        marginHorizontal: scaleWidth(16),
        color: "#DB7D2A",
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
