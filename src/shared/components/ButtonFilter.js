import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { images, colors, fonts } from "@shared/themes";

export const ButtonFilter = ({
    children,
    onApply = () => { },
    onReset = () => { },
    onOpen = () => { },
    ...props
}) => {

    const [open, setOpen] = React.useState(false);

    const toggleButton = () => {
        if(!open) onOpen();
        setOpen(isOpen => !isOpen);
    }

    const apply = () => {
        onApply();
        setOpen(false);
    }

    const reset = () => {
        onReset();
    }

    return (
        <>
            <IconButton
                icon={images.iconFilter}
                iconStyle={styles.iconFilter}
                onPress={toggleButton}
            />
            <Modal
                isVisible={open}
                transparent={true}
                backdropColor={'rgba(64,64,64,0.3)'}
                hasBackdrop={true}
                backdropTransitionOutTiming={0}
                backdropOpacity={0.6}
                style={styles.modal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                onBackdropPress={toggleButton}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                statusBarTranslucent
            >
                <View style={styles.containerFilter}>
                    <View style={styles.header}>
                        <Text style={styles.txtHeader}>Filters</Text>
                        <TouchableOpacity onPress={toggleButton}>
                            <Image
                                source={images.iconClose}
                                style={styles.iconClose}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {children}
                    </View>

                    <View style={styles.bottom}>
                        <Button
                            onPress={reset}
                            height={scaleHeight(40)}
                            width={scaleWidth(132)}
                            label="Reset"
                        />
                        <Button
                            onPress={apply}
                            highlight={true}
                            height={scaleHeight(40)}
                            width={scaleWidth(132)}
                            label="Apply"
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    iconFilter: {
        width: scaleWidth(17),
        height: scaleWidth(17),
    },
    containerFilter: {
        height: scaleHeight(770),
        width: scaleWidth(310),
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 5,
    },
    modal: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 0,
        padding: 0,
    },
    content: {
        flex: 1,
        padding: scaleWidth(16),
    },
    bottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: scaleWidth(16),
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: scaleWidth(16),
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee"
    },
    txtHeader: {
        color: colors.greyish_brown_40,
        fontSize: scaleFont(19),
        fontFamily: fonts.MEDIUM
    },
    iconClose: {
        resizeMode: 'contain',
        width: scaleWidth(26),
        height: scaleWidth(26),
        tintColor: colors.greyish_brown_40,
    }
})
