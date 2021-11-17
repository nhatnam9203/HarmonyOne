import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import Modal from "react-native-modal";


export const PopupErrorMessage = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onModalHide = () => { },
        title,
        message,
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
                <View style={styles.container}>
                    <Text style={styles.txtTitle}>
                        {title}
                    </Text>
                    <Image 
                        source={images.danger}
                        style={styles.iconChecked}
                        resizeMode='contain'
                    />
                    <Text style={styles.content} >
                        {message}
                    </Text>
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
        position: 'relative',
    },

    modal: {
        margin: 0,
    },

    iconChecked : {
        width : scaleWidth(43),
        height : scaleWidth(43),
        marginTop: scaleHeight(20)
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
    content: {
         color: '#404040', 
         fontSize: scaleFont(15), 
         marginTop: scaleHeight(4) 
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

});
