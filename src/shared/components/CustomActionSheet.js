import React from 'react';
import { CustomModal } from '@shared/components';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, fonts } from '@shared/themes';
import { SafeAreaView } from 'react-native-safe-area-context';


export const CustomActionSheet = React.forwardRef(
    ({ onHide = () => { }, children, ...props }, ref) => {

        const [open, setOpen] = React.useState(false);

        const onModalHide = () => {
            setOpen(false);
            onHide();
        };

        React.useImperativeHandle(ref, () => ({
            show: () => {
                setOpen(true);
            },
            hide: () => {
                setOpen(false);
            }
        }));

        return (
            <CustomModal
                {...props}
                isVisible={open}
                onRequestClose={onModalHide}
                onBackdropPress={onModalHide}
                style={styles.modal}
            >
                <SafeAreaView style={styles.container}>
                    {children}
                </SafeAreaView>
            </CustomModal>
        );
    },
);

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },

    container: {
        flex: 0,
        width: '100%',
    },

    content: {
        borderRadius: scaleHeight(5),
        backgroundColor: colors.white,
        marginVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(16),
    },

    bottomBorder: {
        borderBottomColor: '#eee',
        borderBottomWidth: scaleHeight(1),
    },

    itemContent: {
        height: scaleHeight(44),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textItem: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: -0.41,
        textAlign: 'center',
        color: colors.greyish_brown_40,
    },
});
