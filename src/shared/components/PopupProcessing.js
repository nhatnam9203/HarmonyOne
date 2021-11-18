import React from "react";
import { useTranslation } from "react-i18next";
import { 
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
    ActivityIndicator, 
} from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import Modal from "react-native-modal";


export const PopupProcessing = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onModalHide = () => { },
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const hideModal = () => {
            setOpen(false);
            onModalHide();
        };

        const onHandleYESButtonPress = () => {
            if (onConfirmYes && typeof onConfirmYes === "function") {
                onConfirmYes();
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
                        <Text style={styles.title} >
                            {"Please wait"}
                        </Text>
                        <Text style={styles.content} >
                            {"Transaction is processing"}
                        </Text>

                        <View style={styles.indicator} >
                            <ActivityIndicator
                                size={'small'}
                                color="rgb(83,157,209)"
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
        height : scaleHeight(180),
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
        transform: [{ scale: 3 }]
    },

});
