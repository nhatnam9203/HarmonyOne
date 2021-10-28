import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import Modal from "react-native-modal";


export const PopupProcessingCredit = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onModalHide = () => { },
        transactionId
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const hideModal = () => {
            setOpen(false);
            onModalHide();
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
                <View style={styles.container} >
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <Text style={styles.title} >
                            {"Please wait"}
                        </Text>
                        <Text style={styles.content} >
                            {"Transaction is processing"}
                        </Text>

                        <View style={styles.indicator} >
                            <ActivityIndicator
                                size={'large'}
                                color="rgb(83,157,209)"

                            />
                        </View>

                        {
                            transactionId ? <Text style={{ alignSelf: "center", color: "#404040", fontSize: scaleSize(18) }} >
                                Enter<Text style={{ color: "red", fontWeight: "bold" }} >{` ${transactionId} `}</Text> number into your PAX machine!
                        </Text> : <View />
                        }

                        {
                            Platform.OS === "ios" ? <View style={{ paddingVertical: scaleSize(14) }} >
                                <Button
                                    onPress={onHandleYESButtonPress}
                                    highlight={false}
                                    height={scaleHeight(48)}
                                    width={scaleWidth(169 * 2)}
                                    label="Cancel"
                                    styleButton={{
                                        borderWidth: 0,
                                        backgroundColor: "transparent"
                                    }}
                        />
                            </View> : <View />
                        }


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

    modal: {
        margin: 0,
    },

    title: { 
        color: '#0764B0', 
        fontSize: scaleFont(18), 
        fontWeight: 'bold' 
    },
    content: {
         color: '#404040', 
         fontSize: scaleFont(15), 
         marginTop: scaleHeight(4) 
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 4 }]
    },

});
